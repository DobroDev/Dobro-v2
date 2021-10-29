const { Message } = require("discord.js");
const { Client, Lang } = require("../../modules/Utils");
const { send } = require("@skyra/editable-commands");

module.exports = {
  name: "ping",
  description: "Pong!",
  usage: "ping",
  aliases: ["pong", "latency"],
  perms: ["SEND_MESSAGES"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const msg = await send(message, {
      content: Lang.GeneralCommands.Ping.awaitMsg,
    });

    return send(message, {
      content: Lang.GeneralCommands.Ping.Response.replace(
        "(ping)",
        client.ws.ping
      ).replace(
        "(msgping)",
        msg.createdTimestamp -
          (message.createdTimestamp || message.editedTimestamp)
      ),
    });
  },
};
