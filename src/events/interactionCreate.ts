import {
	CommandInteractionOptionResolver,
	ContextMenuInteraction,
} from 'discord.js';
import { client } from '../index';
import { Event } from '../structures';
import { ExtendInteraction } from '../structures/iSlash';

export default new Event('interactionCreate', async (interaction) => {
	const { Errors, Bot } = client.config;
	const { formatPermission } = client.utils;
	
	if (interaction.isCommand()) {
		const command = client.slashCommands.get(interaction.commandName);
		if (!command)
			return interaction.reply({
				content: ':x: Something went wrong..',
				ephemeral: true,
			});

		// development
		if (
			command.Development &&
			interaction.guild.id !== Bot.DevServer &&
			!client.config.Bot.Developers.includes(interaction.user.id)
		) {
			return interaction.reply({
				content: Errors.inDevelopment,
				ephemeral: true,
			});
		}

		//Permission Handling
		if (!interaction.memberPermissions.has(command.permsneeded || [])) {
			return interaction.reply({
				content: Errors.noPerms.replace(
					'(perms)',
					`${formatPermission(command.permsneeded.toString())}`
				),
				ephemeral: true,
			});
		}
		try {
			command.run({
				args: interaction.options as CommandInteractionOptionResolver,
				interaction: interaction as ExtendInteraction,
				client,
			});
		} catch (e) {
			client.consola.error(new Error(e));
			return interaction.reply({
				content: ':x: Something went wrong.. Please contact a developer!',
				ephemeral: true,
			});
		}
	}

	if (interaction.isContextMenu()) {
		const menu = client.contextMenus.get(interaction.commandName);
		if (!menu)
			return interaction.reply({
				content: ':x: Something went wrong..',
				ephemeral: true,
			});

		if (!interaction.memberPermissions.has(menu.permsneeded || [])) {
			return interaction.reply({
				content: Errors.noPerms.replace(
					'(perms)',
					`${formatPermission(menu.permsneeded.toString())}`
				),
				ephemeral: true,
			});
		}

		try {
			menu.run({
				context: interaction as ContextMenuInteraction,
				client,
			});
		} catch (e) {
			client.consola.error(new Error(e));
			return interaction.reply({
				content: ':x: Something went wrong.. Please contact a developer!',
				ephemeral: true,
			});
		}
	}
});
