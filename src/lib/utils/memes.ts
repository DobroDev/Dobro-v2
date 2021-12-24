import axios from 'axios';
import {
	Message,
	MessageActionRow,
	MessageButton,
	TextChannel,
	User,
} from 'discord.js';
import { Dobro } from '../structures/Client';
import { CInteraction } from '../typings/iSlash';

export async function meme({ client, channel }: createM) {
	const { create, globalErr } = client.embeds;
	const reddits = ['memes', 'me_irl', 'dankmemes', 'comedyheaven'];
	const subreddit = reddits[Math.floor(Math.random() * reddits.length)];
	try {
		const response = await axios.get(
			`https://meme-api.herokuapp.com/gimme/${subreddit}`
		);
		const { data } = response;

		if (data.nsfw && !(channel as TextChannel).nsfw) {
			return globalErr(
				'🔞 This post seems to be nsfw. Move to channel where NSFW is enabled.'
			);
		}

		return create({
			title: data.title,
			url: data.postLink,
			image: data.url,
			footer: `👍 ${data.ups}`,
			color: 'RANDOM',
		});
	} catch (err) {
		return globalErr('The api seems to be down');
	}
}

export async function updateMeme({
	client,
	author,
	m,
	interaction,
	slash,
}: memeOptions) {
	if (slash && interaction) {
		interaction.editReply({
			embeds: [await meme({ client: client, channel: interaction.channel as TextChannel })],
		});

		const collector = interaction.channel.createMessageComponentCollector({
			componentType: 'BUTTON',
			time: 1000000,
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
	} else {
		m.edit({ embeds: [await meme({ client: client, channel: m.channel as TextChannel })] });

		const collector = m.channel.createMessageComponentCollector({
			componentType: 'BUTTON',
			time: 1000000,
		});

		const disabled = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('e')
				.setLabel('Interaction Ended.')
				.setStyle('SECONDARY')
				.setDisabled(true)
		);

		collector.on('collect', async (button) => {
			if (button.user.id !== author.id)
				return button.reply({
					content: `That's not yours. Run the meme command to get one of your own :)`,
					ephemeral: true,
				});

			if (button.customId === 'end') {
				await button.deferUpdate();
				m.edit({ components: [disabled] });
				return;
			}

			await updateMeme({ client: client, author: author, m: m });
			await button.deferUpdate();
			collector.stop();
		});

		collector.on('end', async (button, i) => {
			if (i === 'time') {
				m.edit({ components: [disabled] });
			}
		});
	}
}

export interface createM {
	client: Dobro;
	channel: TextChannel;
}

export interface memeOptions {
	client: Dobro;
	author: User;
	m?: Message;
	interaction?: CInteraction;
	slash?: boolean;
}
