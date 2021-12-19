import {
	CommandInteractionOptionResolver,
	ContextMenuInteraction,
} from 'discord.js';
import { client } from '../index';
import { Event } from '../lib/structures/Event';
import { CInteraction } from '../lib/typings/iSlash';

export default new Event('interactionCreate', async (interaction) => {
	if (interaction.isCommand()) {
		const command = client.slashCommands.get(interaction.commandName);
		if (!command)
			return interaction.reply({
				embeds: [
					client.embeds.create({
						description: ':x: Something went wrong...',
						color: client.config.colors.error,
					}),
				],
				ephemeral: true,
			});

		if (
			command.inDevelopment &&
			interaction.guild.id !== client.config.devServer &&
			!client.config.developers.includes(interaction.user.id)
		) {
			return interaction.reply({
				content:
					'This command is current in development and will be released in the near future.',
				ephemeral: true,
			});
		}

		if (!interaction.memberPermissions.has(command.userPerms || [])) {
			return interaction.reply({
				embeds: [
					client.embeds.create({
						description: `You are missing the **${client.utils.formatPerm(
							`${command.userPerms}`
						)}** permission to run this command!`,
					}),
				],
				ephemeral: true,
			});
		}

		try {
			command.run({
				args: interaction.options as CommandInteractionOptionResolver,
				interaction: interaction as CInteraction,
				client,
			});
		} catch (err) {
			client.logger.error(new Error(err));

			if (interaction.replied) {
				interaction
					.followUp({
						content: ':x: Something went wrong.. Please contact a developer!',
						ephemeral: true,
					})
					.catch((e: any) => {
						client.logger.error(new Error(e));
					});
				return;
			} else {
				interaction.reply({
					content: ':x: Something went wrong.. Please contact a developer!',
					ephemeral: true,
				});
			}
		}
	}

	if (interaction.isContextMenu()) {
		const menu = client.contextMenus.get(interaction.commandName);

		if (!menu)
			return interaction.reply({
				content: ':x: Something went wrong..',
				ephemeral: true,
			});

		if (!interaction.memberPermissions.has(menu.userPerms || [])) {
			return interaction.reply({
				embeds: [
					client.embeds.create({
						description: `You are missing the **${client.utils.formatPerm(
							`${menu.userPerms}`
						)}** permission to run this command!`,
					}),
				],
				ephemeral: true,
			});
		}

		try {
			menu.run({
				ctx: interaction as ContextMenuInteraction,
				client,
			});
		} catch (err) {
			client.logger.error(new Error(err));
			if (interaction.replied) {
				interaction
					.followUp({
						content: ':x: Something went wrong.. Please contact a developer!',
						ephemeral: true,
					})
					.catch((e: any) => {
						client.logger.error(new Error(e));
					});
				return;
			} else {
				interaction.reply({
					content: ':x: Something went wrong.. Please contact a developer!',
					ephemeral: true,
				});
			}
		}
	}
});
