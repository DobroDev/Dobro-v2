import { slashCommand } from '../../structures';
import { GuildMember, SnowflakeUtil } from 'discord.js';
import infractions from '../../lib/models/infractions';

export default new slashCommand({
	name: 'ban',
	description: 'Bans a user.',
	permsneeded: ['BAN_MEMBERS'],
	Development: true,
	options: [
		{
			name: 'user',
			description: 'The user you want to ban',
			type: 'USER',
			required: false,
		},
		{
			name: 'reason',
			description: 'The reason for banning this user.',
			type: 'STRING',
			required: false,
		},
	],
	run: async ({ client, interaction }) => {
		const { Embed } = client.utils;
		const member = interaction.options.getMember('user') as GuildMember;
		const reason =
			interaction.options.getString('reason') || 'No reason provided.';

		const { member: staffMember, guild } = interaction;

		if (member.id === staffMember.id) {
			return interaction.reply({
				embeds: [
					Embed({ presets: 'ERROR', description: 'You cannot ban yourself!' }),
				],
				ephemeral: true,
			});
		}

		if (
			(guild.ownerId !== staffMember.id &&
				member.roles.highest.position > staffMember.roles.highest.position) ||
			member.roles.highest.position === staffMember.roles.highest.position
		) {
			return interaction.reply({
				embeds: [
					Embed({
						presets: 'ERROR',
						description: 'You cannot ban that user.',
					}),
				],
				ephemeral: true,
			});
		}

		const ID = SnowflakeUtil.generate().toString();

		try {
			await member.ban({
				reason: `Banned by ${staffMember.user.tag}. Reason: ${reason}`,
				days: 7,
			});

			await new infractions({
				guildId: guild.id,
				infractionId: ID,
				userId: member.id,
				moderatorId: staffMember.id,
				type: 'ban',
				reason: reason,
				timestamp: new Date(),
				active: true,
			}).save();
		} catch (e) {
			client.consola.error(e);
			interaction.reply({
				embeds: [
					Embed({
						presets: 'ERROR',
						description: `I could not ban the user <@!${member.id}>`,
					}),
				],
				ephemeral: true,
			});
			return;
		}

		interaction.reply({
			embeds: [
				Embed({
					description: `<@!${member.user.id}> was **banned**`,
					color: client.config.embedColors.success,
				}),
			],
		});

		member.user
			.send({
				embeds: [
					Embed({
						description: `You were banned in ${guild.name} | Reason: ${reason}`,
						color: 'RED',
						footer: `ID: ${ID}`,
					}),
				],
			})
			.catch((e) => {});
	},
});
