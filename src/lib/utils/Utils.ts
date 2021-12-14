import {
	ApplicationCommandDataResolvable,
	Message,
	MessageEmbed,
} from 'discord.js';
import { Dobro } from '../structures/Client';

export default class Utils {
	/**
	 *
	 * Import a command with ease.
	 * @param filePath The path of the file to import.
	 * @example ```ts
	 *  importFile('../../command.ts')
	 * ```
	 */
	public async importFile(filePath: string) {
		return (await import(filePath))?.default;
	}

	/** Registers slash commands. */
	public async registerCommands({
		client,
		guildID,
		reset,
		dev,
		global,
	}: iRegister) {
		const devGuild = client.guilds.cache.get(guildID);

		if (reset) {
			await devGuild?.commands.set([]);
			client.application?.commands.set([]);
			return;
		}

		if (guildID && dev) {
			await devGuild?.commands.set(dev);
			client.logger.log(
				client.color.blueBright('[Bot] Registered (/) commands to Dev Server.')
			);
		}
		if (global) {
			client.application?.commands.set(global);
			client.logger.log(
				client.color.blueBright('[Bot] Registered (/) commands globally.')
			);
		}
	}

	/**
	 *
	 * Reply to a user without pinging them coz it looks cool.
	 * @param message Message.
	 * @param options The content or Embed to send.
	 * @example```ts
	 * inlineReply(message, { content: 'Hello World!'});
	 * ```
	 */
	public inlineReply(
		message: Message,
		options: { content?: string; embed?: MessageEmbed }
	) {
		message.reply({
			content: options.content,
			embeds: [options.embed],
			allowedMentions: { repliedUser: false },
		});
	}

	/**
	 *
	 * Get a custom emoji with ease!
	 * @param client Discord Client.
	 * @param options The emoji's name or ID.
	 * @example ```ts
	 * getEmoji(client, 'emojiname')
	 * ```
	 */
	public getEmoji(client: Dobro, options: string) {
		const emoji = client.emojis.cache.find(
			(e) => e.id === options || e.name === options
		);

		return emoji;
	}

	/**
	 *
	 * Formats a Discord Permission.
	 * @param permission The permission to format.
	 * @example```ts
	 * formatPerm('SEND_MESSAGES');
	 * ```
	 */
	public formatPerm(permission: string) {
		permission = permission.replace(/\_/g, ' ');
		const split = permission.trim().split(' ');
		const splitFixed = [];
		split.forEach((e) => {
			e = e.charAt(0).toUpperCase() + e.slice(1).toLocaleLowerCase();
			splitFixed.push(e);
		});
		return splitFixed.join(' ');
	}

	public async ArgsMember(
		message: Message,
		args: string[],
		includeAuthor?: boolean
	) {
		const member =
			message.mentions.members.first() ||
			message.guild.members.cache.find((m) => m.id === args[0]);

		if (includeAuthor) {
			return member || message.member;
		} else {
			return member;
		}
	}
}

export interface iRegister {
	/** Discord Client. */
	client: Dobro;
	/** Dev guild ID. */
	guildID?: string;
	/** Resets the slash commands. */
	reset?: boolean;
	/** The array of slash commands to register to the dev guild. */
	dev?: ApplicationCommandDataResolvable[];
	/** The array of slash commands to register globally. */
	global?: ApplicationCommandDataResolvable[];
}
