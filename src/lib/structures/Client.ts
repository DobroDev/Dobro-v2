import {
	Client,
	Collection,
	Message,
	MessageActionRow,
	MessageEmbed,
} from 'discord.js';
import { iSlash } from '../typings/iSlash';
import { iContext } from '../typings/iContext';
import { iCommand } from '../typings/iCommand';
import * as config from '../../config.example';
import consola from 'consola';
import chalk from 'chalk';
import mongoose from 'mongoose';
import Utils from '../utils/Utils';
import Embeds from '../utils/Embeds';

import SlashHandler from '../handlers/SlashHandler';
import eventHandler from '../handlers/eventHandler';
import commandHandler from '../handlers/commandHandler';
import DbUtils from '../utils/DbUtils';

export class Dobro extends Client {
	public commands: Collection<string, iCommand> = new Collection();
	public aliases: Collection<string, string> = new Collection();
	public slashCommands: Collection<string, iSlash> = new Collection();
	public contextMenus: Collection<string, iContext> = new Collection();
	public config = config;
	public utils = new Utils();
	public embeds = new Embeds();
	public db = new DbUtils();
	public color = chalk;
	public logger = consola;
	public constructor() {
		super({
			intents: 32767,
			presence: { status: 'idle' },
		});
	}

	init() {
		this.dbConnect();
		this.loadModules();
		this.clientLogin();
	}

	async dbConnect() {
		await mongoose.connect(config.MongoURI);
		this.logger.log(this.color.green('[Database] Connected.'));
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

	public async inlineReply(
		message: Message,
		options: {
			content?: string;
			embed?: MessageEmbed;
			components?: MessageActionRow;
		}
	) {
		if (options.content) {
			return await message.reply({
				content: options.content,
				components: options.components ? [options.components] : [],
				allowedMentions: { repliedUser: false },
			});
		} else if (options.embed) {
			return await message.reply({
				content: options.content,
				embeds: [options.embed],
				components: options.components ? [options.components] : [],
				allowedMentions: { repliedUser: false },
			});
		}
	}
}
