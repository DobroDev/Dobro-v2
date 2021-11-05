const { Message } = require('discord.js');
const { Client, SetupEmbed, getUser } = require('../../modules/Utils');

module.exports = {
	name: 'server-avatar',
	description: "Displays the member's server avatar.",
	usage: 'server-avatar [@user|ID]',
	aliases: ['sa', 'savatar'],
	minArgs: 0,
	perms: ['SEND_MESSAGES'],
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const member = getUser(message, args);

		const serverAvatar = member.displayAvatarURL({ size: 1024 });

		message.channel.send({
			embeds: [
				SetupEmbed({
					author: member.user.tag,
					icon: member.user.displayAvatarURL(),
					image: serverAvatar,
				}),
			],
		});
	},
};
