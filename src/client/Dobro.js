const { Client, Collection } = require('discord.js');
const config = require('../../config.json');
const Utils = require('../modules/Utils');
const consola = require('consola');

const EventHandler = require('../handlers/eventHandler');
const CommandHandler = require('../handlers/commandHandler');
const SlashHandler = require('../handlers/slashHandler');
const ErrorHandler = require('../handlers/errorHandler');

class Dobro extends Client {
	constructor(options) {
		super(options);

		this.commands = new Collection();
		this.aliases = new Collection();
		this.slashCommands = new Collection();
		this.Utils = Utils;
		this.config = config;
		this.consola = consola;
		this.prefix = config.Bot.prefix;
	}

	loadHandlers() {
		EventHandler(this);
		CommandHandler(this);
		SlashHandler(this);
		ErrorHandler(this);
	}

	signIn() {
		this.login(this.config.Bot.token).catch((err) => {
			console.log('Invalid Token'.bgRed);
			process.exit();
		});
	}
}

module.exports.Dobro = Dobro;
