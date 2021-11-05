const { Message, Collection } = require('discord.js');
const { Client, Embeds, SetupEmbed, Lang } = require('../../Modules/Utils');

module.exports = {
	name: 'messageCreate',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 */
	run: async (client, message) => {
		try {
			if (
				message.author.bot ||
				!message.content.toLowerCase().startsWith(client.prefix)
			)
				return;

			const [cmd, ...args] = message.content
				.slice(client.prefix.length)
				.trim()
				.split(/ +/g);

			let command = client.commands.get(cmd.toLowerCase());

			if (!command) command = client.commands.get(client.aliases.get(cmd));

			if (!command) return message.delete();

			// Permission Handling
			if (!message.member.permissions.has(command.permissions || [])) {
				message.delete();

				return message.channel
					.send({
						content: Lang.NoPerms.replace(
							'(perms)',
							`\`${command.permissions}\``
						),
					})
					.then((msg) => {
						setTimeout(() => {
							msg.delete();
						}, 10000);
					});
			}

			//devOnly
			if (
				command.devOnly &&
				!client.config.Bot.Developers.includes(message.author.id)
			) {
				return message.delete();
			}

			//Args
			if (command.minArgs > args.length) {
				return message.reply({
					embeds: [
						SetupEmbed({
							title: Lang.Errors.invalidargs,
							description: Lang.Usage.replace(
								'(usage)',
								client.prefix + command.usage
							),
							color: Embeds.Colors.Error,
						}),
					],
				});
			}

			await command.run(client, message, args);
		} catch (err) {
			client.consola.error(new Error(err));
		}
	},
};
