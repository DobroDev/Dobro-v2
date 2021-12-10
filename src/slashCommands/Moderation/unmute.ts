import { slashCommand } from '../../structures';
import infractions from '../../lib/models/infractions';
import Guild from '../../lib/models/guild';
import { GuildMember, SnowflakeUtil } from 'discord.js';

export default new slashCommand({
	name: 'unmute',
	description: 'Unmutes a muted user.',
	permsneeded: ['MANAGE_MESSAGES'],
	Development: true,
	options: [
		{
			name: 'user',
			description: 'The user you want to unmute.',
			type: 'USER',
			required: false,
		},
		{
			name: 'reason',
			description: 'The reason for unmuting this user.',
			type: 'STRING',
			required: false,
		},
	],
	run: async ({ client, interaction }) => {
		const { Embed } = client.utils;
		const { guild, member: staffMember, options } = interaction;

		const member = options.getMember('user') as GuildMember;
		const reason = options.getString('reason') || 'No reason provided.';

		const data = await Guild.findOne({ Id: guild.id });

		const muteRole = await guild.roles.fetch(data.muteRole);

		if (!muteRole) {
			interaction.reply({
				embeds: [
					client.utils.Embed({
						presets: 'ERROR',
						description:
							'There is currently no mute role set for this guild. You can configure it by running `/settings muterole_set`',
					}),
				],
				ephemeral: true,
			});

			return;
		}

		const mutedCheck = infractions.findOne({
			guildId: guild.id,
			userId: member.id,
			type: 'mute',
			active: true,
		});

		if (!mutedCheck || !member.roles.cache.has(data.muteRole)) {
			return interaction.reply({
				embeds: [
					Embed({
						presets: 'ERROR',
						description: 'That user is not muted!',
					}),
				],
				ephemeral: true,
			});
		}

		member.roles.remove(muteRole).catch((err: any) => {
			return interaction.reply({
				embeds: [
					Embed({
						presets: 'ERROR',
						description: 'That user is not muted!',
					}),
				],
				ephemeral: true,
			});
		});

		await infractions.updateMany(
			{ guildId: guild.id, userId: member.id, type: 'mute', active: true },
			{ active: false }
		);

		const ID = SnowflakeUtil.generate().toString();

		await new infractions({
			guildId: guild.id,
			infractionId: ID,
			userId: member.id,
			moderatorId: staffMember.id,
			type: 'unmute',
			reason: reason,
			timestamp: new Date(),
		}).save();

		interaction.reply({
			embeds: [
				Embed({
					description: `<@!${member.user.id}> was **unmuted**`,
					color: client.config.embedColors.success,
				}),
			],
		});

		member.user
			.send({
				embeds: [
					client.utils.Embed({
						description: `You were unmuted in ${guild.name} | Reason: ${reason}`,
						color: 'GREEN',
						footer: `ID: ${ID}`,
					}),
				],
			})
			.catch((err: any) => {});
	},
});
