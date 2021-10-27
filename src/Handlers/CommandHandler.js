const { glob } = require("glob");
const { promisify } = require("util");
const PGlob = promisify(glob);
const Table = require("ascii-table");
const Utils = require("../Modules/Utils");
const console = require("console");
const { Client, disabledCommands } = Utils;

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  const Load = new Table(`[${client.prefix}] Commands`);

  (await PGlob(`${process.cwd()}/src/Commands/**/*.js`)).map(async (file) => {
    if (disabledCommands.length > 0 && file.includes(disabledCommands)) return;

    try {
      const command = require(file);

      const Split = file.split("/");

      const fileName = Split[Split.length - 1];
      const directory = Split[Split.length - 2];

      if (!command.name) return Load.addRow(fileName, "❌ no name.");
      if (!command.description)
        return Load.addRow(fileName, "❌ no description.");
      if (!command.usage)
        return Load.addRow(`${directory}/${fileName}`, "❌ no usage");

      if (command.name) {
        if (command.aliases && Array.isArray(command.aliases))
          command.aliases.forEach((alias) =>
            client.aliases.set(alias, command.name)
          );

        const commandObject = {
          name: command.name || "no name.",
          category: directory,
          description: command.description || "no description.",
          usage: command.usage || "no usage.",
          minArgs: command.minArgs || 0,
          aliases: command.aliases,
          permissions: command.perms,
          cooldown: command.cooldown || 0,
          devOnly: command.devOnly || false,
          run: command.run,
        };

        client.commands.set(command.name, commandObject);
        Load.addRow(command.name, "✔️");
      }
    } catch (err) {
      console.log(err);
    }
  });
  console.log(Load.toString().green);
};
