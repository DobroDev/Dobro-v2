import {
	ApplicationCommandDataResolvable,
	Client,
	Collection,
} from 'discord.js';
import { iSlash, config } from '../structures/index';
import * as Utils from '../utilities';
import consola from 'consola';

import glob from 'glob';
import { promisify } from 'util';
const globP = promisify(glob);

import slashHandler from '../../handlers/slashHandler';
import eventHandler from '../../handlers/eventHandler';

export class Dobro extends Client {
	slashCommands: Collection<string, iSlash> = new Collection();
	config = config;
	prefix = this.config.Bot.Prefix;
	utils = Utils;
	consola = consola;
	constructor() {
		super({
			intents: 32767,
			partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
			presence: { status: 'idle' },
		});
	}

	startUp() {
		this.loadModules();
		this.login(this.config.Bot.Token).catch((err: Error) => {
			this.consola.error('Invalid token provided.', err);
			process.exit(1);
		});
	}

	async loadModules() {
		eventHandler(this);
		slashHandler(this);
	}
}
