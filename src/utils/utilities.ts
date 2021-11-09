import {
	Client,
	ColorResolvable,
	EmbedFieldData,
	GuildEmoji,
	HexColorString,
	MessageEmbed,
} from 'discord.js';
import { iRegisterOptions } from './structures';

/**
 *
 * @param filePath The filepath to get file from
 * @returns file
 */
export async function importFile(filePath: string) {
	return (await import(filePath))?.default;
}

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

/**
 *
 * @param color Sets the color of the Embed. Random Color is default.
 * @param author Sets the author of the Embed
 * @param icon Sets the author icon of the Embed
 * @param thumbnail Sets the thumbnail of the Embed
 * @param title Sets the title of the Embed
 * @param description
 * @param fields
 * @param image
 * @param footer
 * @param footericon
 * @param timestamp
 */
export function Embed(
	color?: ColorResolvable | HexColorString,
	author?: string,
	icon?: string,
	thumbnail?: string,
	title?: string,
	description?: string,
	fields?: EmbedFieldData[],
	image?: string,
	footer?: string,
	footericon?: string,
	timestamp?: Date | number | boolean
): MessageEmbed {
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
