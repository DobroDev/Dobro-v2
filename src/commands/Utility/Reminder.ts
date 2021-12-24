import { Command } from '../../lib/structures/Command';
import { EmbedFieldData } from 'discord.js';
import Reminder from '../../lib/models/Reminder';
import pms from 'pretty-ms';

export default new Command({
	name: 'reminder',
	description: 'Make the bot remind you to do something.',
	aliases: ['reminders', 'alarm', 'remind', 'remindme'],
	usage: 'reminder [set|remove|list] <duration|ID> <reason>',
	minArgs: 1,
	examples: [
		'reminder set 1h Play Minecraft',
		'reminder remove 775265751954096138',
		'reminder list',
	],
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message, args }) => {
		const { getDuration, Expire, ms, generateId } = client.utils;
		const chosenAction = args[0];
		const reason = args.slice(2).join(' ') || null;

		const allowedActions = ['set', 'remove', 'list'];

		if (!allowedActions.includes(chosenAction)) {
			message.channel.send({
				embeds: [
					client.embeds.globalErr(
						`Please choose a valid action. You can choose from ${allowedActions
							.map((a) => `\`${a}\``)
							.join(', ')}.`
					),
				],
			});
		}

		switch (chosenAction) {
			case 'set': {
				const duration = args[1];

				if (!duration) {
					await client.inlineReply(message, {
						embed: client.embeds.globalErr('Please provide a valid duration!'),
					});
					return;
				}

				try {
					duration.match(/\d+|\D+/g);
				} catch (err) {
					await client.inlineReply(message, {
						embed: client.embeds.globalErr('Please provide a valid duration!'),
					});
					return;
				}

				const totalTime = ms(duration);

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
					await client.inlineReply(message, {
						embed: set,
					});

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
						message.member.send({ embeds: [reminder] }).catch(() => {});
						message.channel.send({
							content: `<@${message.author.id}>`,
							embeds: [reminder],
						});
					}, totalTime);
					return;
				}

				const ID = generateId();

				await new Reminder({
					Id: ID,
					guildId: message.guild.id,
					userId: message.member.id,
					channelId: message.channel.id,
					reason: reason,
					time: pms(totalTime, {
						verbose: true,
					}),
					expires: expires,
				}).save();

				await client.inlineReply(message, {
					embed: set.setFooter(`ID: ${ID}`),
				});

				break;
			}

			case 'remove': {
				const ID = args[1];

				if (!ID) {
					await client.inlineReply(message, {
						embed: client.embeds.globalErr(
							'Please provide a valid reminder Id to remove!'
						),
					});
					return;
				}

				const data = await Reminder.findOne({
					Id: ID,
					guildID: message.guild.id,
					userId: message.author.id,
				});

				if (!data) {
					await client.inlineReply(message, {
						embed: client.embeds.globalErr(
							'Found no reminder with the provided ID.'
						),
					});
					return;
				}

				await data.delete();

				await client.inlineReply(message, {
					embed: client.embeds.globalSuccess(
						'Successfully removed your reminder.'
					),
				});

				break;
			}

			case 'list': {
				const reminders = await Reminder.find({
					guildId: message.guild.id,
					userId: message.author.id,
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

				await client.inlineReply(message, {
					embed: client.embeds.create({
						title: `${client.utils.getEmoji(client, 'clockthing')} Reminders`,
						description: reminders.length
							? `Viewing **${reminders.length}** reminder(s).`
							: 'You have no reminders set.',
						fields: fields,
						timestamp: true,
					}),
				});

				break;
			}
		}
	},
});
