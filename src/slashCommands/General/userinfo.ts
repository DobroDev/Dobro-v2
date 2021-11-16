import { ColorResolvable, TextChannel } from 'discord.js';
import { slashCommand } from '../../structures';
import moment from 'moment';
import { pagination } from 'reconlx';
export default new slashCommand({
	name: 'userinfo',
	description: 'Displays information about a member.',
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	options: [
		{
			name: 'member',
			description: 'The member who want to know more about.',
			type: 'USER',
			required: false,
		},
	],
	run: async ({ client, interaction }) => {
		const { getMember, getEmoji, Embed, formatString } = client.utils;
		const member = await getMember(interaction, 'INTERACTION', 'member');

		const userFlags = member.user.flags.toArray();
		const { roles } = member;
		const badges = {
			HOUSE_BRAVERY: 'House of Bravery',
			HOUSE_BRILLIANCE: 'House of Brilliance',
			HOUSE_BALANCE: 'House of Balance',
			DISCORD_EMPLOYEE: 'Discord Employee',
			PARTNERED_SERVER_OWNER: 'Partner',
			HYPESQUAD_EVENTS: 'Hypesquad',
			BUGHUNTER_LEVEL_1: 'Bughunter lvl 1',
			EARLY_SUPPORTER: 'Early Supporter',
			EARLY_VERIFIED_BOT_DEVELOPER: 'Verified Bot Developer',
			VERIFIED_BOT: 'Verified Bot',
			DISCORD_CERTIFIED_MODERATOR: 'Certified Discord Moderator',
		};

		let status: string;
		switch (member.presence.status) {
			case 'online':
				status = `${getEmoji(client, 'online')} ${formatString(
					member.presence.status
				)}`;
				break;
			case 'dnd':
				status = `${getEmoji(client, 'dnd')} ${formatString(
					member.presence.status
				)}`;
				break;
			case 'idle':
				status = `${getEmoji(client, 'idle')} ${formatString(
					member.presence.status
				)}`;
				break;
			case 'offline':
				status = `${getEmoji(client, 'offline')} ${formatString(
					member.presence.status
				)}`;
				break;
			case null:
				status = `${getEmoji(client, 'offline')} ${formatString(
					member.presence.status
				)}`;
				break;
		}

		const permissions = [];

		if (member.permissions.has('ADMINISTRATOR')) {
			permissions.push('Administrator');
		}

		if (member.permissions.has('BAN_MEMBERS')) {
			permissions.push('Ban Members');
		}

		if (member.permissions.has('KICK_MEMBERS')) {
			permissions.push('Kick Members');
		}

		if (member.permissions.has('MANAGE_MESSAGES')) {
			permissions.push('Manage Messages');
		}

		if (member.permissions.has('MANAGE_CHANNELS')) {
			permissions.push('Manage Channels');
		}

		if (member.permissions.has('MENTION_EVERYONE')) {
			permissions.push('Mention Everyone');
		}

		if (member.permissions.has('MANAGE_NICKNAMES')) {
			permissions.push('Manage Nicknames');
		}

		if (member.permissions.has('MANAGE_ROLES')) {
			permissions.push('Manage Roles');
		}

		if (member.permissions.has('MANAGE_WEBHOOKS')) {
			permissions.push('Manage Webhooks');
		}

		const embedColor =
			member.displayHexColor === '#000000'
				? ('RANDOM' as ColorResolvable)
				: member.displayHexColor;

		const Embed1 = Embed({
			author: member.user.tag,
			icon: member.displayAvatarURL(),
			thumbnail: member.user.displayAvatarURL(),
			color: embedColor,
			fields: [
				{
					name: 'Display Name',
					value: member.displayName,
					inline: true,
				},
				{
					name: 'ID',
					value: member.id,
					inline: true,
				},
				{
					name: 'Profile Badges',
					value: `${
						userFlags.length === 0
							? 'None'
							: userFlags.map((flag) => badges[flag]).join(', ')
					}`,
					inline: true,
				},
				{
					name: 'Joined',
					value: `${moment(member.joinedTimestamp).format('LL LT')} (${moment(
						member.joinedTimestamp
					).fromNow()})`,
				},
				{
					name: 'Registered',
					value: `${moment(member.user.createdTimestamp).format(
						'LL LTS'
					)} (${moment(member.user.createdTimestamp).fromNow()})`,
					inline: true,
				},
			],
		});

		const Embed2 = Embed({
			color: embedColor,
			fields: [
				{
					name: 'Status',
					value: status,
				},
				{
					name: 'Activity',
					value: member.presence.activities[1]
						? `${formatString(member.presence.activities[1].type)} ${
								member.presence.activities[1].name
						  }`
						: 'None',
				},
				{
					name: `Roles - [${roles.cache.size}]`,
					value:
						roles.cache.size < 25
							? roles.cache.map((role) => `${role}`).join(' ')
							: roles.cache
									.map((role) => `${role}`)
									.slice(0, 25)
									.join(' ') + ' and more...',
				},
				{
					name: 'Key Permissions',
					value: permissions.length > 0 ? permissions.join(', ') : 'None',
				},
			],
		});

		const Ems = [Embed1, Embed2];

		pagination({
			author: interaction.user,
			channel: interaction.channel as TextChannel,
			embeds: Ems,
			fastSkip: true,
			time: 30000,
			button: [
				{
					name: 'first',
					emoji: '⏪',
				},
				{
					name: 'last',
					emoji: '⏩',
				},
				{
					name: 'next',
					emoji: '➡️',
				},
				{
					name: 'previous',
					emoji: '⬅️',
				},
			],
		});
		await interaction.reply({
			content: `Now displaying ${member.user.username}'s info.`,
			ephemeral: true,
		});
	},
});
