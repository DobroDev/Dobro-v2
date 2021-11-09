import { CommandInteractionOptionResolver } from 'discord.js';
import { client } from '..';
import { Event } from '../utils/structures';
import { ExtendInteraction } from '../utils/structures/iSlash';

export default new Event('interactionCreate', async (interaction) => {
	if (interaction.isCommand()) {
		const command = client.slashCommands.get(interaction.commandName);
		if (!command)
			return interaction.reply({
				content: ':x: Something went wrong..',
				ephemeral: true,
			});

		command.run({
			args: interaction.options as CommandInteractionOptionResolver,
			interaction: interaction as ExtendInteraction,
			client,
		});
	}
});
