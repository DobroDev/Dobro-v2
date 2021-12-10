import { slashCommand } from '../../structures';
import infractions from '../../lib/models/infractions';
import { SnowflakeUtil } from 'discord.js';

export default new slashCommand({
	name: 'unban',
	description: 'Unbans a banned user.',
	permsneeded: ['BAN_MEMBERS'],
	Development: true,
	options: [
		{
			name: 'ID',
			description: 'The ID of the banned user.',
			type: 'STRING',
			required: true,
		},
		{
			name: 'reason',
			description: 'The reason for muting this user.',
			type: 'STRING',
			required: false,
		},
	],
	run: async ({ client, interaction }) => {
		const { Embed } = client.utils;
		const { guild, member: staffMember, options } = interaction;

		const memberId = options.getString('ID');
		const reason = options.getString('reason') || 'No reason provided.';

		if (memberId === staffMember.id) {
			return interaction.reply({
				embeds: [
					Embed({ presets: 'ERROR', description: 'You cannot mute yourself!' }),
				],
				ephemeral: true,
			});
		}

		const fetchBans = await guild.bans.fetch();
		const isBanned = fetchBans.find((ban) => ban.user.id === memberId);

		const bannedUser = fetchBans.get(memberId).user;

		const bannedCheck = infractions.findOne({
			guildId: guild.id,
			userId: bannedUser.id,
			type: 'ban',
			active: true,
		});

		if (!isBanned || !bannedCheck) {
			return interaction.reply({
				embeds: [
					Embed({
						presets: 'ERROR',
						description: 'That user is not banned!',
					}),
				],
				ephemeral: true,
			});
		}

		await guild.members
			.unban(
				bannedUser,
				`Unbanned by ${staffMember.user.tag}. Reason: ${reason}`
			)
			.catch(() => {
				interaction.reply({
					embeds: [
						Embed({
							presets: 'ERROR',
							description: 'I could not unban that user.',
						}),
					],
					ephemeral: true,
				});
				return;
			});

		await infractions.updateMany(
			{ guildId: guild.id, userId: bannedUser.id, type: 'ban', active: true },
			{ active: false }
		);

		interaction.reply({
			embeds: [
				Embed({
					description: `<@!${bannedUser.id}> was **unbanned**`,
					color: client.config.embedColors.success,
				}),
			],
		});

		const ID = SnowflakeUtil.generate().toString();

		await new infractions({
			guildId: guild.id,
			infractionId: ID,
			userId: bannedUser.id,
			moderatorId: staffMember.id,
			type: 'unban',
			reason: reason,
			timestamp: new Date(),
		}).save();
	},
});
