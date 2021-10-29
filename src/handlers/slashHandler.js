const { glob } = require("glob");
const { promisify } = require("util");
const PGlob = promisify(glob);
const Table = require("ascii-table");
const Utils = require("../modules/Utils");
const { Client, disabledCommands } = Utils;

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  const Load = new Table("[/] Slash Commands");

  let slashArray = [];

  (await PGlob(`${process.cwd()}/src/slashCommands/*/*.js`)).map(async (file) => {
    if (disabledCommands.length > 0 && file.includes(disabledCommands)) return;

    try {
      const slashCommand = require(file);

      const Split = file.split("/");

      const fileName = Split[Split.length - 1];
      const directory = Split[Split.length - 2];

      if (!slashCommand.name)
        return Load.addRow(`${directory}/${fileName}`, "❌ no name.");
      if (!slashCommand.description)
        return Load.addRow(`${directory}/${fileName}`, "❌ no description.");

      const slashObject = {
        name: slashCommand.name || "no name.",
        category: directory,
        description: slashCommand.description || "no description.",
        options: slashCommand.options,
        permissions: slashCommand.perms,
        devOnly: slashCommand.devOnly || false,
        run: slashCommand.run,
      };

      client.slashCommands.set(slashCommand.name, slashObject);
      slashArray.push(slashCommand);

      Load.addRow(slashCommand.name, "✔️");
    } catch (err) {
      console.log(err);
    }
  });
  console.log("\n")
  console.log(Load.toString().yellow);

  client.on("ready", async () => {
    const MainGuild = client.guilds.cache.get(client.config.Bot.MainGuildID);

    await MainGuild.commands.set(slashArray);
  });
};
