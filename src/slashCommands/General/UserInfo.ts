import {
	ColorResolvable,
	GuildMember,
	MessageActionRow,
	MessageButton,
	MessageEmbed,
} from 'discord.js';
import { SlashCommand } from '../../lib/structures/SlashCommand';

export default new SlashCommand({
	name: 'userinfo',
	description: 'Displays information about a user.',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	options: [
		{
			name: 'target',
			description: "The member who's avatar you want to view.",
			type: 'USER',
			required: false,
		},
	],
	run: async ({ client, interaction }) => {
		const { getEmoji, formatString } = client.utils;
		const member =
			(interaction.options.getMember('target') as GuildMember) ||
			interaction.member;

		const userFlags = member.user.flags.toArray();
		const { roles } = member;
		const AllRoles =
			roles.cache.size < 25
				? roles.cache.map((role) => `${role}`).join(' ')
				: roles.cache
						.map((role) => `${role}`)
						.slice(0, 25)
						.join(' ') + ' and more...';
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

		const em1 = client.embeds.create({
			author: member.user.tag,
			icon: member.user.displayAvatarURL(),
			thumbnail: member.displayAvatarURL(),
			color: embedColor,
			timestamp: true,
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
					value: `<t:${Math.floor(
						member.joinedTimestamp / 1000
					)}:f> (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`,
				},
				{
					name: 'Registered',
					value: `<t:${Math.floor(
						member.user.createdTimestamp / 1000
					)}:f> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)`,
					inline: true,
				},
			],
		});

		let em2: MessageEmbed;
		let status: string;
		if (member.presence) {
			switch (member.presence.status) {
				case 'online':
					status = `${getEmoji(client, 'online')} ${formatString(
						member.presence.status
					)}`;
					break;
				case 'dnd':
					status = `${getEmoji(
						client,
						'dnd'
					)} ${member.presence.status.toUpperCase()}`;
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
			}

			em2 = client.embeds.create({
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
						name: 'Highest Role',
						value: `${member.roles.highest}`,
					},
					{
						name: `Roles - [${roles.cache.size}]`,
						value: AllRoles,
					},
					{
						name: 'Key Permissions',
						value: permissions.length > 0 ? permissions.join(', ') : 'None',
					},
				],
			});
		} else {
			status = `${getEmoji(client, 'offline')} ${formatString('OFFLINE')}`;
			em2 = client.embeds.create({
				color: embedColor,
				fields: [
					{
						name: 'Status',
						value: status,
					},
					{
						name: 'Highest Role',
						value: `${member.roles.highest}`,
					},
					{
						name: `Roles - [${roles.cache.size}]`,
						value: AllRoles,
					},
					{
						name: 'Key Permissions',
						value: permissions.length > 0 ? permissions.join(', ') : 'None',
					},
				],
			});
		}

		function row(state1: boolean, state2: boolean) {
			return new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId(`page1`)
					.setLabel('⬅️')
					.setStyle('PRIMARY')
					.setDisabled(state1),
				new MessageButton()
					.setCustomId(`page2`)
					.setLabel('➡️')
					.setStyle('PRIMARY')
					.setDisabled(state2)
			);
		}

		await interaction.reply({
			embeds: [em1],
			components: [row(true, false)],
			ephemeral: true,
		});

		const collector = interaction.channel.createMessageComponentCollector({
			componentType: 'BUTTON',
			time: 30000,
		});

		collector.on('collect', async (collected) => {
			if (collected.customId === 'page1') {
				await interaction.editReply({
					embeds: [em1],
					components: [row(true, false)],
				});
			}

			if (collected.customId === 'page2') {
				await interaction.editReply({
					embeds: [em2],
					components: [row(false, true)],
				});
			}

			await collected.deferUpdate();
		});

		collector.on('end', async (button, i) => {
			if (i === 'time') {
				interaction.editReply({ components: [row(true, true)] });
			}
		});
	},
});
