import {
    ApplicationCommandDataResolvable,
	ApplicationCommandOption,
	BaseApplicationCommandData,
	ContextMenuInteraction,
	PermissionResolvable,
} from 'discord.js';
import { Dobro } from '../utils/client/Dobro';

interface ContextRunOptions {
	client: Dobro;
	context: ContextMenuInteraction;
}

type ContextRun = (options: ContextRunOptions) => any;



export type iContext = {
    permsneeded: PermissionResolvable[],
    Guild?: boolean
	run: ContextRun;
} & ApplicationCommandDataResolvable;
