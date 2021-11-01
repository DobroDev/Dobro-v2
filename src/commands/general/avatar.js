const { Message } = require("discord.js");
const { Client, SetupEmbed, getUser } = require("../../modules/Utils");

module.exports = {
  name: "avatar",
  description: "Displays a user's avatar",
  usage: "avatar [@user|ID]",
  aliases: ["av", "avt"],
  perms: ["SEND_MESSAGES"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = getUser(message, args);

    const userAvatar = user.user.displayAvatarURL({ size: 1024 });

    message.channel.send({
      embeds: [
        SetupEmbed({
          author: user.user.tag,
          icon: user.displayAvatarURL(),
          image: userAvatar,
        }),
      ],
    });
  },
};
