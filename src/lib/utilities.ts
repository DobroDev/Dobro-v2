import {
	GuildEmoji,
	GuildMember,
	MessageActionRow,
	MessageButton,
	MessageEmbed,
	TextChannel,
} from 'discord.js';
import {
	iRegisterOptions,
	iEmbed,
	MemberFetchOptions,
	config,
} from '../structures';
import { Dobro } from './client/Dobro';
import axios from 'axios';
import { ExtendInteraction } from '../structures/iSlash';
import { client } from '..';
import mongoose from 'mongoose';

/**
 *
 * @name registerSlash
 * @param filePath The filepath to get file from
 * @returns file
 */
export async function importFile(filePath: string) {
	return (await import(filePath))?.default;
}

/**
 * 
 * @name registerSlash
 * @description Registers slash commands
 */
export async function registerSlash({
	client,
	guildID,
	resetcommands,
	devcommands,
	appcommands,
}: iRegisterOptions): Promise<void> {
	if (resetcommands) {
		await client.guilds.cache.get(guildID)?.commands.set([]);
		client.application?.commands.set([]);
		return;
	}
	if (guildID && devcommands) {
		await client.guilds.cache.get(guildID)?.commands.set(devcommands);
		client.consola.log(
			client.chalk.blueBright('[Bot] Registered (/) commands to Dev Server.')
		);
	}
	if (appcommands) {
		client.application?.commands.set(appcommands);
		client.consola.log(
			client.chalk.blueBright('[Bot] Registered (/) commands globally.')
		);
	}
}

/**
 * 
 * @name Embed
 * @description Create a MessageEmbed with ease!
 * @returns MessageEmbed
 */
export function Embed({
	author,
	icon,
	url,
	thumbnail,
	title,
	description,
	color,
	fields,
	image,
	footer,
	footericon,
	timestamp,
	presets,
}: iEmbed): MessageEmbed {
	const Embed = new MessageEmbed();

	if (presets) {
		if (presets === 'ERROR') {
			Embed.setColor(config.embedColors.error);
			if (title) Embed.setTitle(title);
			if (description)
				Embed.setDescription(`${getEmoji(client, 'erremoji')} ${description}`);
		}
		if (presets === 'SUCCESS') {
			Embed.setColor(config.embedColors.success);
			if (title) Embed.setTitle(title);
			if (description)
				Embed.setDescription(
					`${getEmoji(client, 'successemoji')} ${description}`
				);
		}
	} else {
		if (author) Embed.setAuthor(author);
		if (author && icon) Embed.setAuthor(author, icon);
		if (url) Embed.setURL(url);
		if (thumbnail) Embed.setThumbnail(thumbnail);
		if (title) Embed.setTitle(title);
		if (description) Embed.setDescription(description);
		if (fields) Embed.addFields(fields);
		if (image) Embed.setImage(image);
		Embed.setColor(color || 'RANDOM');
		if (footer) Embed.setFooter(footer);
		if (footer && footericon) Embed.setFooter(footer, footericon);
		if (timestamp) {
			if (timestamp === true) {
				Embed.setTimestamp(new Date());
			} else {
				Embed.setTimestamp(timestamp);
			}
		}
	}

	return Embed;
}

/**
 * 
 * @name getEmoji
 * @description Get a custom emoji with ease!
 * @param client Discord Client
 * @param emojiname Emoji's name
 * @param emojiid Emoji's ID
 * @returns GuildEmoji
 */
export function getEmoji(
	client: Dobro,
	emojiname?: string,
	emojiid?: string
): GuildEmoji {
	const emoji = client.emojis.cache.find(
		(e) => e.name === emojiname || e.id === emojiid
	) as GuildEmoji;

	return emoji;
}

/**
 *
 * @name getMember
 * @description Fetches a GuildMember
 * @param interaction CommandInteraction
 * @param args ID / Username / Display name / Interaction option
 * @returns GuildMember
 */
export async function getMember(
	interaction: ExtendInteraction,
	args: MemberFetchOptions,
	interactionOptionname: string
): Promise<GuildMember> {
	let member: GuildMember;
	if (args === 'GET') {
		member =
			(await interaction.guild.members.fetch(args)) ||
			interaction.guild.members.cache.find(
				(m) => m.displayName == args || m.user.username == args || m.id === args
			);
	}
	if (args === 'INTERACTION') {
		member =
			(interaction.options.getMember(interactionOptionname) as GuildMember) ||
			interaction.member;
	}

	return member;
}

/**
 *
 * @name getUser
 * @description Fetches a User
 * @param interaction CommandInteraction
 * @param args Interaction option
 * @returns User
 */
export function getUser(interaction: ExtendInteraction, args: string) {
	return interaction.options.getUser(args) || interaction.user;
}

/**
 *
 * @name formatPermission
 * @description Formats a Discord Permission
 * @param permission Permission flag string
 * @returns Formatted permission
 */
export function formatPermission(permission: string): string {
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
 * @name formatString
 * @description Formats a string
 * @param str String to format
 * @returns Formatted string
 */
export function formatString(str: string) {
	return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

/**
 * 
 * @command meme
 * @param client Discord Client
 * @param subreddit Name of the subreddit
 * @param interaction CommandInteraction
 * @returns MessageEmbed
 */
export async function meme(
	client: Dobro,
	subreddit: string,
	interaction: ExtendInteraction
) {
	const { Meme } = client.config.FunCommands;
	const { Embed } = client.utils;
	try {
		const response = await axios.get(
			`https://meme-api.herokuapp.com/gimme/${subreddit}`
		);
		const { data } = response;

		if (data.nsfw && !(interaction.channel as TextChannel).nsfw) {
			return Embed({ presets: 'ERROR', description: Meme.NSFW });
		}

		return Embed({
			title: data.title,
			url: data.postLink,
			image: data.url,
			footer: `👍 ${data.ups}`,
		});
	} catch (error) {
		return Embed({
			presets: 'ERROR',
			description: 'The api seems to be down :(',
		});
	}
}

/**
 * 
 * @command meme
 * @param client Discord Client
 * @param subreddit Name of the subreddit
 * @param interaction CommandInteraction
 * @returns MessageEmbed
 */
export async function updateMeme(
	client: Dobro,
	subreddit: string,
	interaction: ExtendInteraction
) {
	const updateEmbed = await meme(client, subreddit, interaction);

	interaction.editReply({ embeds: [updateEmbed] });

	const collector = interaction.channel.createMessageComponentCollector({
		componentType: 'BUTTON',
		time: 120000,
	});

	collector.on('collect', async (button) => {
		if (button.user.id !== interaction.user.id)
			button.reply({
				content: `That's not yours. Run /meme to get one of your own :)`,
				ephemeral: true,
			});

		await button.deferUpdate();
		await updateMeme(client, subreddit, interaction);
		collector.stop();
	});

	collector.on('end', async (button, i) => {
		const disable = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('e')
				.setLabel('Interaction Ended.')
				.setStyle('SECONDARY')
				.setDisabled(true)
		);
		if (i === 'time') {
			interaction.editReply({ components: [disable] });
		}
	});
}

/**
 * 
 * @name dbConnect
 * @description Connects to the database
 * @param MongoURI MongoDb connection string
 */
export async function dbConnect(MongoURI: string) {
	await mongoose.connect(MongoURI);
	client.consola.log(client.chalk.greenBright('[Database] Connected.'));
}
