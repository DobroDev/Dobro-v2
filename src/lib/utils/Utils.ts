import { ApplicationCommandDataResolvable, Message } from 'discord.js';
import { Dobro } from '../structures/Client';
import { Duration } from '@sapphire/time-utilities';
import ms, { StringValue } from 'ms';

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
	 * Get a custom emoji with ease!
	 * @param client Discord Client.
	 * @param options The emoji's name or ID.
	 * @example ```ts
	 * getEmoji(client, 'emojiname');
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

	/**
	 *
	 * Gets the target member for a command.
	 * @param message Message.
	 * @param args Message args.
	 * @param includeAuthor Include message author?
	 * @example```ts
	 * ArgsMember(message, args, true);
	 * ```
	 */
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

	/**
	 *
	 * Formats a string.
	 * @param str String to format.
	 * @example```ts
	 * formatString('TEST');
	 * ```
	 */
	public formatString(str: string) {
		return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
	}

	/**
	 *
	 * Converts a string to a date.
	 * @param time The time to convert.
	 * @example```ts
	 * getDuration('1h');
	 * ```
	 */
	public getDuration(time: string) {
		return new Duration(time).fromNow || null;
	}

	/**
	 *
	 * Calculate expiry time
	 * @param time Time to calculate.
	 * @example```ts
	 * Expire(new Date())
	 * ```
	 */
	public Expire(time: Date) {
		if (!isNaN(time.getTime()) && time.getTime() > Date.now()) {
			return new Date(time);
		} else {
			return null;
		}
	}

	public ms(value: StringValue, ) {
		return ms(value);
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
