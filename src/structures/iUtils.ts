import { ColorResolvable, EmbedFieldData, HexColorString } from 'discord.js';

type embedPresets = 'ERROR' | 'SUCCESS';

export interface iEmbed {
	author?: string;
	url?: string;
	icon?: string;
	thumbnail?: string;
	title?: string;
	description?: string;
	color?: ColorResolvable | HexColorString;
	fields?: EmbedFieldData[];
	image?: string;
	footer?: string;
	footericon?: string;
	timestamp?: Date | number | boolean;
	presets?: embedPresets;
}

export type MemberFetchOptions = 'GET' | 'INTERACTION';
