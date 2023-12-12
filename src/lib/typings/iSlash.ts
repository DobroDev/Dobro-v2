import {
	ChatInputApplicationCommandData,
	CommandInteraction,
	CommandInteractionOptionResolver,
	GuildMember,
	PermissionResolvable,
} from 'discord.js';
import { Dobro } from '../structures/Client';

export interface CInteraction extends CommandInteraction {
	/**Interaction Member.*/
	member: GuildMember;
}

interface runOptions {
	/** Discord Client. */
	client: Dobro;
	/** CommandInteraction. */
	interaction: CInteraction;
	/** OptionResolver. */
	args: CommandInteractionOptionResolver;
}

type Run = (options: runOptions) => void;

export type iSlash = ChatInputApplicationCommandData & {
	/** Permission needed by a user to run the command. */
	userPerms: PermissionResolvable[];
	/** In development? */
	inDevelopment?: boolean;
	/** Run function. */
	run: Run;
};
