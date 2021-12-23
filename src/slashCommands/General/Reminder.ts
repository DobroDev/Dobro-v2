import { SlashCommand } from '../../lib/structures/SlashCommand';
import { EmbedFieldData } from 'discord.js';
import Reminder from '../../lib/models/Reminder';
import pms from 'pretty-ms';

export default new SlashCommand({
	name: 'reminder',
	description: 'Make the bot remind you to do something.',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	options: [
		{
			name: 'set',
			description: 'Set a reminder.',
			type: 'SUB_COMMAND',
			options: [
				{
					name: 'duration',
					description: 'The duration of the reminder.',
					type: 'STRING',
					required: true,
				},
				{
					name: 'reason',
					description: 'The reason of the reminder.',
					type: 'STRING',
					required: false,
				},
			],
		},
		{
			name: 'remove',
			description: 'Remove a reminder.',
			type: 'SUB_COMMAND',
			options: [
				{
					name: 'id',
					description: 'The ID of the reminder.',
					type: 'STRING',
					required: true,
				},
			],
		},
		{
			name: 'list',
			description: 'Displays list of active reminders.',
			type: 'SUB_COMMAND',
		},
	],
	run: async ({ client, interaction }) => {
		const { getDuration, Expire, ms, generateId } = client.utils;
		const { options, guild, user } = interaction;

		const duration = options.getString('duration');
		const reason = options.getString('reason') || null;
		const id = options.getString('id');

		switch (options.getSubcommand()) {
			case 'set': {
				const totalTime = ms(duration);

				if (isNaN(totalTime)) {
					interaction.reply({
						embeds: [
							client.embeds.globalErr(
								'Please provide a valid duration! Ex: 10s, 2m, 6h, 1d'
							),
						],
					});
					return;
				}

				const expires = Expire(getDuration(duration));

				const set = client.embeds.create({
					title: `${client.utils.getEmoji(client, 'clockthing')} Reminder Set!`,
					description: reason
						? `You will be reminded to ${reason} in **${pms(totalTime, {
								verbose: true,
						  })}**`
						: `Your reminder will go off in **${pms(totalTime, {
								verbose: true,
						  })}**`,
					color: 'RANDOM',
				});

				if (60000 > totalTime) {
					interaction.reply({ embeds: [set] });

					const reminder = client.embeds.create({
						title: `${client.utils.getEmoji(client, 'clockthing')} Reminder`,
						description: reason
							? `**Hey! Don't forget to:** ${reason}`
							: `**It has been ${pms(totalTime, {
									verbose: true,
							  })}.**`,
						color: 'RANDOM',
					});

					setTimeout(() => {
						interaction.user.send({ embeds: [reminder] }).catch(() => {});
						interaction.channel.send({
							content: `<@${user.id}>`,
							embeds: [reminder],
						});
					}, totalTime);
					return;
				}

				const ID = generateId();

				await new Reminder({
					Id: ID,
					guildId: guild.id,
					userId: user.id,
					channelId: interaction.channel.id,
					reason: reason,
					time: pms(totalTime, {
						verbose: true,
					}),
					expires: expires,
				}).save();

				interaction.reply({ embeds: [set.setFooter(`ID: ${ID}`)] });

				break;
			}

			case 'remove': {
				const data = await Reminder.findOne({
					Id: id,
					guildID: guild.id,
					userId: user.id,
				});

				if (!data) {
					interaction.reply({
						embeds: [
							client.embeds.globalErr(
								'Found no reminder with the provided ID.'
							),
						],
					});
					return;
				}

				await data.delete();

				interaction.reply({
					embeds: [
						client.embeds.globalSuccess('Successfully removed your reminder.'),
					],
				});

				break;
			}

			case 'list': {
				const reminders = await Reminder.find({
					guildId: guild.id,
					userId: user.id,
				});

				const fields: EmbedFieldData[] = [];

				reminders.forEach(async (r) => {
					fields.push({
						name: `**ID:** \`${r.Id}\``,
						value: `**Reason:** ${
							reason ? r.reason : 'No reason provided'
						}\n**Goes off:** <t:${Math.floor(r.expires.getTime() / 1000)}:R>`,
					});
				});

				interaction.reply({
					embeds: [
						client.embeds.create({
							title: `${client.utils.getEmoji(client, 'clockthing')} Reminders`,
							description: reminders.length
								? `Viewing **${reminders.length}** reminder(s).`
								: 'You have no reminders set.',
							fields: fields,
							timestamp: true,
						}),
					],
				});

				break;
			}
		}
	},
});
