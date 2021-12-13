import { Message, PermissionResolvable } from 'discord.js';
import { Dobro } from '../structures/Client';

interface runOptions {
	/** Discord Client. */
	client: Dobro;
	/** Message. */
	message: Message;
	/** Args system. */
	args: string[];
}

type Run = (options: runOptions) => void;

export type iCommand = {
	name: string;
	description: string;
	aliases?: string[];
	userPerms: PermissionResolvable[];
	usage: string;
	minArgs?: number;
	examples?: string[];
	devOnly?: boolean;
	run: Run;
};
