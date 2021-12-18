import {
	ColorResolvable,
	HexColorString,
	EmbedFieldData,
	MessageEmbed,
} from 'discord.js';
import { client } from '../../index';

export default class Embeds {
	/**
	 *
	 * Simple way to create a MessageEmbed.
	 * @example```ts
	 * 	interaction.reply({ embeds: [client.embeds.create({ description: 'this is some text' })] });
	 * ```
	 */
	public create({
		author,
		url,
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
	}: embedOptions) {
		const Embed = new MessageEmbed();

		if (author) Embed.setAuthor(author);
		if (author && icon) Embed.setAuthor(author, icon);
		if (url) Embed.setURL(url);
		if (thumbnail) Embed.setThumbnail(thumbnail);
		if (title) Embed.setTitle(title);
		if (description) Embed.setDescription(description);
		if (fields) Embed.addFields(fields);
		if (image) Embed.setImage(image);
		Embed.setColor(color || client.config.colors.default);
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
	 * Sends an error message.
	 * @param description The error message.
	 * @param footer Optional
	 * @example ```ts
	 * interaction.reply({ embeds: [client.embeds.globalErr('Error Occured')] });
	 * ```
	 */
	public globalErr(description: string, footer?: string) {
		const Embed = new MessageEmbed()
			.setColor(client.config.colors.error)
			.setDescription(`${client.utils.getEmoji(client, 'erremoji')} ${description}`);
		if (footer) Embed.setFooter(footer);

		return Embed;
	}

	/**
	 *
	 * Sends an error message.
	 * @param description The error message.
	 * @param timestamp Timestamp?
	 * @example ```ts
	 * interaction.reply({ embeds: [client.embeds.globalErr('Error Occured')] });
	 * ```
	 */
	public globalSuccess(description: string, footer?: string) {
		const Embed = new MessageEmbed().setDescription(
			`${client.utils.getEmoji(client, 'successemoji')} ${description}`
		);
		if (footer) Embed.setFooter(footer);

		return Embed;
	}
}

export interface embedOptions {
	/**
	 * MessageEmbed author
	 */
	author?: string;
	/**
	 * MessageEmbed URL
	 */
	url?: string;
	/**
	 * MessageEmbed author icon
	 */
	icon?: string;
	/**
	 * MessageEmbed thumbnail
	 */
	thumbnail?: string;
	/**
	 * MessageEmbed title
	 */
	title?: string;
	/**
	 * MessageEmbed description
	 */
	description?: string;
	/**
	 * MessageEmbed color
	 */
	color?: ColorResolvable | HexColorString;
	/**
	 * MessageEmbed fields
	 */
	fields?: EmbedFieldData[];
	/**
	 * MessageEmbed image
	 */
	image?: string;
	/**
	 * MessageEmbed footer
	 */
	footer?: string;
	/**
	 * MessageEmbed footer icon
	 */
	footericon?: string;
	/**
	 * MessageEmbed timestamp?
	 */
	timestamp?: Date | number | boolean;
}
