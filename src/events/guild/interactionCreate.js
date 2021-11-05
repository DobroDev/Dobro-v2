const { CommandInteraction } = require("discord.js");
const { Client, Lang } = require("../../Modules/Utils");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    try {
      if (interaction.isCommand()) {
        const command = client.slashCommands.get(interaction.commandName);
        if (!command)
          return (
            interaction.reply({ content: Lang.Errors.InvalidCommand }) &&
            client.slashCommands.delete(interaction.commandName)
          );

        // Permission Handling
        if (!interaction.member.permissions.has(command.permissions || []))
          return interaction
            .reply({
              content: Lang.NoPerms.replace("(perms)", command.permissions),
              ephemeral: true,
            })
            .catch((e) => {
              console.log(e);
            });

        // devOnly
        if (
          command.devOnly &&
          !client.config.Bot.Developers.includes(interaction.user.id)
        ) {
          return interaction.reply({ content: Lang.DevOnly, ephemeral: true });
        }

        command.run(client, interaction);
      }
    } catch (err) {
     	client.consola.error(new Error(err));
    }
  },
};
