const { CommandInteraction } = require("discord.js");
const { Client, Lang } = require("../../Modules/Utils");

module.exports = {
  name: "ping",
  description: "Pong!",
  perms: ["SEND_MESSAGES"],
  devOnly: true,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const date = Date.now();

    interaction.reply({
      content: Lang.GeneralCommands.Ping.awaitMsg,
    }).then(() => {
      interaction.editReply({
        content: Lang.GeneralCommands.Ping.Response.replace(
          "(ping)",
          client.ws.ping
        ).replace("(msgping)", Date.now() - date),
      });
    })
  },
};
