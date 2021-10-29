const config = require("../../config.json");

module.exports = {
  // Imports
  Discord: require("discord.js"),
  Client: require("../index"),
  Embed: require("discord.js").MessageEmbed,
  Config: config.Bot,
  Database: config.Database,
  Embeds: config.Embeds,
  Lang: config.Lang,
  disabledCommands: config.disabledCommands,
  disabledEvents: config.disabledEvents,

  // Functions
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
    const Embed = new this.Embed();

    if (author) Embed.setAuthor(author);
    if (author && icon) Embed.setAuthor(author, icon);
    if (thumbnail) Embed.setThumbnail(thumbnail);
    if (title) Embed.setTitle(title);
    if (description) Embed.setDescription(description);
    if (fields) Embed.addFields(fields);
    if (image) Embed.setImage(image);
    if (color) Embed.setColor(color || "RANDOM");
    if (footer) Embed.setFooter(footer);
    if (footer && footericon) Embed.setFooter(footer, footericon);
    if (timestamp) {
      if (typeof timestamp === "boolean") Embed.setTimestamp(new Date());
    } else Embed.setTimestamp(timestamp);
  }, 
};
