import { Client, Collection, Util } from 'discord.js';
import { iSlash } from '../typings/iSlash';
import { iCommand } from '../typings/iCommand';
import * as config from '../../config.example';
import consola from 'consola';
import chalk from 'chalk';
import Utils from '../utils/Utils';
import Embeds from '../utils/Embeds';

import SlashHandler from '../handlers/SlashHandler';
import eventHandler from '../handlers/eventHandler';
import commandHandler from '../handlers/commandHandler';

export class Dobro extends Client {
	public commands: Collection<string, iCommand> = new Collection();
	public aliases: Collection<string, string> = new Collection();
	public slashCommands: Collection<string, iSlash> = new Collection();
	public config = config;
	public utils = new Utils();
	public embeds = new Embeds();
	public color = chalk;
	public logger = consola;
	public constructor() {
		super({
			intents: 32767,
			presence: { status: 'idle' },
		});
	}

	init() {
		this.loadModules();
		this.clientLogin();
	}

	clientLogin() {
		if (this.config.dev) {
			this.login(this.config.devToken).catch((err: any) => {
				this.logger.error(err);
				process.exit(0);
			});
		} else {
			this.login(this.config.token).catch((err: any) => {
				this.logger.error(err);
				process.exit(0);
			});
		}
	}

	loadModules() {
		eventHandler(this);
		commandHandler(this);
		SlashHandler(this);
	}
}
