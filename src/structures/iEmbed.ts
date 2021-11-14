import { ColorResolvable, EmbedFieldData, HexColorString } from "discord.js";

export interface iEmbed {
	author?: string;
	url?: string;
	icon?: string;
	thumbnail?: string;
	title?: string;
	description?: string;
	color?: ColorResolvable | HexColorString
	fields?: EmbedFieldData[];
	image?: string;
	footer?: string;
	footericon?: string;
	timestamp?: Date | number | boolean;
}
