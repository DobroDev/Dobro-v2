import { ColorResolvable, EmbedFieldData, HexColorString } from 'discord.js';

type embedPresets = 'ERROR' | 'SUCCESS';

export interface iEmbed {
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
	/**
	 * Embed Presets
	 */
	presets?: embedPresets;
}

export type MemberFetchOptions = 'GET' | 'INTERACTION';
