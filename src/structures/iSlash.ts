import {
	ChatInputApplicationCommandData,
	CommandInteraction,
	CommandInteractionOptionResolver,
	GuildMember,
	PermissionResolvable,
} from 'discord.js';
import { Dobro } from '../utils/client/Dobro';

export interface ExtendInteraction extends CommandInteraction {
	/** Interaction Member */
	member: GuildMember;
}

interface RunOptions {
	/** Discord Client */
	client: Dobro;
	/** CommandInteraction */
	interaction: ExtendInteraction;
	/** CommandInteraction Options */
	args: CommandInteractionOptionResolver;
}

type Run = (options: RunOptions) => any;

export type iSlash = {
	/** Permissions needed for user to run the command. */
	permsneeded: PermissionResolvable[];
	/** Test only? */
	Development?: boolean;
	/** Run Function */
	run: Run;
} & ChatInputApplicationCommandData;
