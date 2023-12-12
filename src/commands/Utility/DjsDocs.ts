import { EmbedFieldData, HexColorString } from 'discord.js';
import { Command } from '../../lib/structures/Command';
import axios from 'axios';

export default new Command({
	name: 'djsdocs',
	description: 'Search through the Discord.js documentation.',
	aliases: ['djs', 'discorddocs'],
	usage: 'djsdocs <query>',
	minArgs: 1,
	examples: ['djsdocs Client'],
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message, args }) => {
		const query = args.join(' ');

		try {
			const results = await axios.get(
				`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
					query
				)}`
			);

			await client.inlineReply(message, {
				embed: client.embeds.create({
					author: results.data.author.name as string,
					url: results.data.author.url as string,
					icon: results.data.author.icon_url as string,
					description: results.data.description as string,
					fields: results.data.fields as EmbedFieldData[],
					color: '#2296f3' as HexColorString,
					timestamp: true,
				}),
			});
		} catch (err) {
			client.inlineReply(message, { content: 'No results popped up.' });
		}
	},
});
