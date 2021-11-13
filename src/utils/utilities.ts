import {
	Client,
	ColorResolvable,
	EmbedFieldData,
	GuildEmoji,
	HexColorString,
	MessageEmbed,
} from 'discord.js';
import { iRegisterOptions, iEmbed } from '../structures';

// Import File
/**
 *
 * @param filePath The filepath to get file from
 * @returns file
 */
export async function importFile(filePath: string) {
	return (await import(filePath))?.default;
}

// Slash Command Registering
export async function registerSlash({
	client,
	guildID,
	resetcommands,
	devcommands,
	appcommands,
}: iRegisterOptions) {
	if (resetcommands) {
		await client.guilds.cache.get(guildID)?.commands.set([]);
		await client.application?.commands.set([]);
		return;
	}
	if (guildID && devcommands) {
		await client.guilds.cache.get(guildID)?.commands.set(devcommands);
		client.consola.log('Registered (/) commands to Dev Server.');
	}
	if (appcommands) {
		client.application?.commands.set(appcommands);
		client.consola.log('Registered (/) commands globally.');
	}
}

// Embed Builer
export function Embed({
	author,
	icon,
	thumbnail,
	title,
	description,
	color,
	fields,
	image,
	footer,
	footericon,
	timestamp,
}: iEmbed): MessageEmbed {
	const Embed = new MessageEmbed();
	if (author) Embed.setAuthor(author);
	if (author && icon) Embed.setAuthor(author, icon);
	if (thumbnail) Embed.setThumbnail(thumbnail);
	if (title) Embed.setTitle(title);
	if (description) Embed.setDescription(description);
	if (fields) Embed.addFields(fields);
	if (image) Embed.setImage(image);
	Embed.setColor(color || 'RANDOM');
	if (footer) Embed.setFooter(footer);
	if (footer && footericon) Embed.setFooter(footer, footericon);
	if (timestamp) {
		if (timestamp === true) {
			Embed.setTimestamp(new Date());
		} else {
			Embed.setTimestamp(timestamp);
		}
	}

	return Embed;
}

// Emoji getter
/**
 *
 * @param client Discord Client
 * @param emojinameorid Emoji ID/Name
 * @returns GuildEmoji
 */
export function getEmoji(client: Client, emojinameorid: string): GuildEmoji {
	const emoji = client.emojis.cache.find(
		(e) => e.name === emojinameorid || e.id === emojinameorid
	) as GuildEmoji;

	return emoji;
}

// Permission Flag formatter
/**
 *
 * @param permission Permission flag string
 * @returns Formatted permission
 */
export function formatPermission(permission: string): string {
	permission = permission.replace(/\_/g, ' ');
	const split = permission.trim().split(' ');
	const splitFixed = [];
	split.forEach((e) => {
		e = e.charAt(0).toUpperCase() + e.slice(1).toLocaleLowerCase();
		splitFixed.push(e);
	});
	return splitFixed.join(' ');
}

// Perm Check
export const PermsObject: any = {
	ADMINISTRATOR: 'Administrator',
	VIEW_AUDIT_LOG: 'View Audit Log',
	VIEW_GUILD_INSIGHTS: 'View Server Insights',
	MANAGE_GUILD: 'Manage Server',
	MANAGE_ROLES: 'Manage Roles',
	MANAGE_CHANNELS: 'Manage Channels',
	KICK_MEMBERS: 'Kick Members',
	BAN_MEMBERS: 'Ban Members',
	CREATE_INSTANT_INVITE: 'Create Invite',
	CHANGE_NICKNAME: 'Change Nickname',
	MANAGE_NICKNAMES: 'Manage Nicknames',
	MANAGE_EMOJIS: 'Manage Emojis',
	MANAGE_WEBHOOKS: 'Manage Webhooks',
	VIEW_CHANNEL: 'Read Text Channels & See Voice Channels',
	SEND_MESSAGES: 'Send Messages',
	SEND_TTS_MESSAGES: 'Send TTS Messages',
	MANAGE_MESSAGES: 'Manage Messages',
	EMBED_LINKS: 'Embed Links',
	ATTACH_FILES: 'Attach Files',
	READ_MESSAGE_HISTORY: 'Read Message History',
	MENTION_EVERYONE: 'Mention @everyone, @here, and All Roles',
	USE_EXTERNAL_EMOJIS: 'Use External Emojis',
	ADD_REACTIONS: 'Add Reactions',
	CONNECT: 'Connect',
	SPEAK: 'Speak',
	STREAM: 'Video',
	MUTE_MEMBERS: 'Mute Members',
	DEAFEN_MEMBERS: 'Deafen Members',
	MOVE_MEMBERS: 'Move Members',
	USE_VAD: 'Use Voice Activity',
	PRIORITY_SPEAKER: 'Priority Speaker',
	MANAGE_EMOJIS_AND_STICKERS: 'Manage Emojis & Stickers',
	MANAGE_THREADS: 'Manage Threads',
	SEND_MESSAGES_IN_THREADS: 'Send Messages in Threads',
	START_EMBEDDED_ACTIVITIES: 'Start Embeded Activities',
	USE_APPLICATION_COMMANDS: 'Use Application Commands',
	REQUEST_TO_SPEAK: 'Request to Speak',
	USE_PUBLIC_THREADS: 'Use Public Threads',
	CREATE_PUBLIC_THREADS: 'Create Public Threads',
	USE_PRIVATE_THREADS: 'Use Private Threads',
	CREATE_PRIVATE_THREADS: 'Create Private Threads',
	USE_EXTERNAL_STICKERS: 'Use External Stickers',
};
