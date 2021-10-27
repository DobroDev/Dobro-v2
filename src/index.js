require("colors");

// Node Version Check
if (+process.version.slice(1).split("v")[0] < 16.6) {
  console.log("This bot needs Node JS version 16.6 or higher".bgRed);
  process.exit();
}

const { Dobro } = require("./Client/Dobro");

const client = new Dobro({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767,
});

module.exports = client;

// Loads all Handlers - Command, Event etc.
client.loadHandlers();

// Bot logs in
client.signIn();
