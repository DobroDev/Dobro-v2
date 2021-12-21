import { MessageActionRow, MessageButton } from 'discord.js';
import { Command } from '../../lib/structures/Command';
import { meme, updateMeme } from '../../lib/utils/memes';

export default new Command({
	name: 'meme',
	description: 'Displays a random meme from Reddit.',
	aliases: ['reddit'],
	usage: 'meme',
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message }) => {
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

		const m = await client.inlineReply(message, {
			embed: await meme({ client: client, channel: message.channel }),
			components: row,
		});

		const collector = m.channel.createMessageComponentCollector({
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
			if (button.user.id !== message.author.id)
				return button.reply({
					content: `That's not yours. Run /meme to get one of your own :)`,
					ephemeral: true,
				});

			if (button.customId === 'end') {
				await button.deferUpdate();
				m.edit({ components: [disabled] });
				return;
			}

			await button.deferUpdate();
			await updateMeme({ client: client, author: message.author, m: m });
			collector.stop();
		});

		collector.on('end', async (button, i) => {
			if (i === 'time') {
				m.edit({ components: [disabled] });
			}
		});
	},
});
