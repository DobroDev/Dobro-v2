const { MessageEmbed, Message } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  // Imports
  Discord: require("discord.js"),
  Client: require("../index"),
  Embed: MessageEmbed,
  Config: config.Bot,
  Database: config.Database,
  Embeds: config.Embeds,
  Lang: config.Lang,
  disabledCommands: config.disabledCommands,
  disabledEvents: config.disabledEvents,

  //Functions

  SetupEmbed: function ({
    author,
    icon,
    thumbnail,
    title,
    description,
    fields,
    image,
    color,
    footer,
    footericon,
    timestamp,
  }) {
    const Embed = new MessageEmbed();

    if (author) Embed.setAuthor(author);
    if (author && icon) Embed.setAuthor(author, icon);
    if (thumbnail) Embed.setThumbnail(thumbnail);
    if (title) Embed.setTitle(title);
    if (description) Embed.setDescription(description);
    if (fields) Embed.addFields(fields);
    if (image) Embed.setImage(image);
    if (color) {
      Embed.setColor(color);
    } else Embed.setColor("RANDOM");
    if (footer) Embed.setFooter(footer);
    if (footer && footericon) Embed.setFooter(footer, footericon);
    if (timestamp) {
      if (typeof timestamp === true) {
        Embed.setTimestamp(new Date());
      } else Embed.setTimestamp(timestamp);
    }

    return Embed;
  },

  /**
   *
   * @param {Message} message
   * @param {String[]} args
   */
  getUser: function (message, args) {
    if (!message) throw new Error("No message parameter given.".bgRed);
    if (!args) throw new Error("No Args provided".bgRed);
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find((c) => c.nickname || c.displayName) ||
      message.member;

    return user;
  },
};
