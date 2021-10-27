const { Client, Collection } = require("discord.js");
const config = require("../../config.json");

const EventHandler = require("../Handlers/EventHandler");
const CommandHandler = require("../Handlers/CommandHandler");
const ErrorHandler = require("../Handlers/ErrorHandler");

class Dobro extends Client {
  constructor(options) {
    super(options);

    this.commands = new Collection();
    this.aliases = new Collection();
    this.slashCommands = new Collection();
    this.config = config;
    this.prefix = config.Bot.prefix;
  }

  loadHandlers() {
    EventHandler(this);
    CommandHandler(this);
    ErrorHandler(this);
  }

  signIn() {
    this.login(this.config.Bot.token).catch((err) => {
      console.log("Invalid Token".bgRed);
      process.exit();
    });
  }
}

module.exports.Dobro = Dobro;
