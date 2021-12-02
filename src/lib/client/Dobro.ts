import { Client, Collection } from 'discord.js';
import { iSlash, config, iContext } from '../../structures/index';
import * as utils from '../utilities';
import consola from 'consola';
import chalk from 'chalk';

import slashHandler from '../../handlers/slashHandler';
import eventHandler from '../../handlers/eventHandler';
import errorHandler from '../../handlers/errorHandler';

export class Dobro extends Client {
	slashCommands: Collection<string, iSlash> = new Collection();
	contextMenus: Collection<string, iContext> = new Collection();
	config = config;
	utils = utils;
	consola = consola;
	chalk = chalk;
	constructor() {
		super({
			intents: 32767,
			presence: { status: 'idle' },
		});
	}

	startUp() {
		this.loadModules();
		this.login(this.config.Bot.Token).catch((err: Error) => {
			this.consola.error(new Error('Invalid token provided.' + err));
			process.exit(1);
		});
		this.utils
			.dbConnect(this.config.Database.URL)
			.catch((err) => this.consola.error(new Error(err)));
	}

	loadModules() {
		eventHandler(this);
		slashHandler(this);
		errorHandler(this);
	}
}
