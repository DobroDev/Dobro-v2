import { ApplicationCommandDataResolvable, ContextMenuInteraction, PermissionResolvable } from 'discord.js';
import { Dobro } from '../structures/Client';

interface runOptions {
	/** Discord Client. */
	client: Dobro;
	/** ContextMenu Interaction. */
	ctx: ContextMenuInteraction;
}

type Run = (options: runOptions) => void;

export type iContext = {
	/** The permission needed to run the context menu. */
	userPerms: PermissionResolvable[];
	/** In Development?  */
	inDevelopment: boolean;
	/** Run function. */
	run: Run;
} & ApplicationCommandDataResolvable
