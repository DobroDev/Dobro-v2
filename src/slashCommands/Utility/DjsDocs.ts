import { SlashCommand } from '../../lib/structures/SlashCommand';
import { EmbedFieldData, HexColorString } from 'discord.js';
import axios from 'axios';

export default new SlashCommand({
	name: 'djsdocs',
	description: 'Search through the Discord.js documentation.',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	options: [
		{
			name: 'query',
			description: 'The query to search.',
			type: 'STRING',
			required: true,
		},
	],
	run: async ({ client, interaction }) => {
		const query = interaction.options.getString('query');

		try {
			const results = await axios.get(
				`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
					query
				)}`
			);

			interaction.reply({
				embeds: [
					client.embeds.create({
						author: results.data.author.name as string,
						url: results.data.author.url as string,
						icon: results.data.author.icon_url as string,
						description: results.data.description as string,
						fields: results.data.fields as EmbedFieldData[],
						color: '#2296f3' as HexColorString,
						timestamp: true,
					}),
				],
			});
		} catch (err) {
			interaction.reply({ content: 'No results came up.', ephemeral: true });
			return;
		}
	},
});
