import { Message } from 'discord.js';
import { client } from '../index';
import { Event } from '../lib/structures/Event';

export default new Event('messageCreate', async (message) => {
	if (
		message.author.bot ||
		!message.content.toLowerCase().startsWith(client.config.prefix)
	)
		return;

	const [cmd, ...args] = message.content
		.slice(client.config.prefix.length)
		.trim()
		.split(/ +/g);

	let command =
		client.commands.get(cmd.toLowerCase()) ||
		client.commands.get(client.aliases.get(cmd));

	if (!command) return;

	if (command.devOnly && !client.config.developers.includes(message.author.id))
		return;

	if (!message.member.permissions.has(command.userPerms || [])) {
		return client.utils.inlineReply(message, {
			embed: client.embeds.create({
				title: 'Missing Permissions',
				description: `You are missing the **${client.utils.formatPerm(
					`${command.userPerms}`
				)}** permission to run this command!`,
			}),
		});
	}

	if (command.minArgs && command.minArgs > args.length) {
		return client.utils.inlineReply(message, {
			embed: client.embeds.create({
				title: '\\❌ Missing Arguments!',
				description: command.examples
					? `**Usage:** ${client.config.prefix}${
							command.usage
					  }\n**Examples:** ${command.examples
							.map((e) => `${client.config.prefix + e}`)
							.join('\n')}`
					: `**Usage:** ${client.config.prefix}${command.usage}`,
			}),
		});
	}

	try {
		command.run({
			args: args,
			message: message as Message,
			client,
		});
	} catch (err) {
		client.logger.error(new Error(err));

		message.channel.send(':x: Something went wrong..');
	}
});
