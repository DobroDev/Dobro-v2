import { Command } from '../../lib/structures/Command';
import axios from 'axios';

export default new Command({
	name: '8ball',
	description: 'Ask the 8ball about your future. (100% real!!)',
	aliases: ['8b'],
	minArgs: 1,
	usage: '8ball <question>',
	examples: ['8ball is Dobro cool?'],
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message, args }) => {
		let question = args[0];

		if (!question.includes('?')) {
			question = `${question}?`;
		}

		try {
			const response = await axios.get(
				`https://8ball.delegator.com/magic/JSON/${encodeURIComponent(question)}`
			);

			client.utils.inlineReply(message, {
				embed: client.embeds.create({
					author: question,
					icon: client.user.displayAvatarURL(),
					description: `:8ball: ${response.data.magic.answer}`,
				}),
			});
		} catch (err) {
			client.utils.inlineReply(message, {
				content: 'The api seems to be down :(',
			});
		}
	},
});
