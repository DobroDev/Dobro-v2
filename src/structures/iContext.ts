import {
	ApplicationCommandDataResolvable,
	ContextMenuInteraction,
	PermissionResolvable,
} from 'discord.js';
import { Dobro } from '../lib/client/Dobro';

interface ContextRunOptions {
	/**
	 * Client
	 */
	client: Dobro;
	/**
	 * Context Menu
	 */
	context: ContextMenuInteraction;
}

type ContextRun = (options: ContextRunOptions) => any;

export type iContext = {
	/**
	 * The permission needed to run the context menu
	 */
	permsneeded: PermissionResolvable[];
	/**
	 * Register the menu to the development server?
	 */
	Guild?: boolean;
	/** Run function */
	run: ContextRun;
} & ApplicationCommandDataResolvable;
