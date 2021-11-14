import { slashCommand } from '../../structures';
import axios from 'axios';
import { client } from '../..';
import {
	Client,
	MessageActionRow,
	MessageButton,
	MessageEmbed,
	TextChannel,
} from 'discord.js';

export default new slashCommand({
	name: 'meme',
	description: 'Displays a random meme from Reddit.',
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	options: [
		{
			name: 'subreddit',
			description: 'The subreddit to request a meme from.',
			type: 'STRING',
			required: false,
		},
	],
	run: async ({ interaction }) => {
		const { meme, updateMeme } = client.utils;

		const reddits = ['memes', 'me_irl', 'dankmemes', 'comedyheaven'];
		const reddit = reddits[Math.floor(Math.random() * reddits.length)];
		const subreddit = interaction.options.getString('subreddit') || reddit;

		const reload = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('reload')
				.setLabel('Reload Meme')
				.setStyle('PRIMARY')
		);
		const disabled = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('reload')
				.setLabel('Reload Meme')
				.setStyle('SECONDARY')
				.setDisabled(true)
		);

		const LoadMeme = await meme(client, subreddit, interaction);

		await interaction.reply({ embeds: [LoadMeme], components: [reload] });

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

			button.deferUpdate();
			await updateMeme(client, subreddit, interaction);
			collector.stop();
		});

		collector.on('end', async (button, i) => {
			if (i === 'time') {
				interaction.editReply({ components: [disabled] });
			}
		});
	},
});
