import { MessageActionRow, MessageButton } from 'discord.js';
import { SlashCommand } from '../../lib/structures/SlashCommand';
import { meme, updateMeme } from '../../lib/utils/memes';

export default new SlashCommand({
	name: 'meme',
	description: 'Displays a random meme from Reddit.',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	run: async ({ client, interaction }) => {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('reload')
				.setLabel('Reload Meme')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('end')
				.setLabel('Stop')
				.setStyle('DANGER')
				.setEmoji(client.utils.getEmoji(client, '918877980896428062'))
		);

		await interaction.reply({
			embeds: [await meme({ client: client, channel: interaction.channel })],
			components: [row],
		});

		const collector = interaction.channel.createMessageComponentCollector({
			componentType: 'BUTTON',
			time: 120000,
		});

		const disabled = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('e')
				.setLabel('Interaction Ended.')
				.setStyle('SECONDARY')
				.setDisabled(true)
		);

		collector.on('collect', async (button) => {
			if (button.user.id !== interaction.user.id)
				return button.reply({
					content: `That's not yours. Run /meme to get one of your own :)`,
					ephemeral: true,
				});

			if (button.customId === 'end') {
				await button.deferUpdate();
				interaction.editReply({ components: [disabled] });
				return;
			}

			await updateMeme({
				client: client,
				author: interaction.user,
				interaction: interaction,
				slash: true,
			});
			await button.deferUpdate();
			collector.stop();
		});

		collector.on('end', async (button, i) => {
			if (i === 'time') {
				interaction.editReply({ components: [disabled] });
			}
		});
	},
});
