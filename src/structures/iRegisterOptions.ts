import { ApplicationCommandDataResolvable } from 'discord.js';
import { Dobro } from '../utils/client/Dobro';

export interface iRegisterOptions {
	/** Discord Client */
	client: Dobro;
	/** Test Server's ID */
	guildID?: string;
	/** To reset all slash commands */
	resetcommands?: boolean;
	/** Test Server: slash commands */
	devcommands?: ApplicationCommandDataResolvable[];
	/** Global: slash commands */
	appcommands?: ApplicationCommandDataResolvable[];
}
