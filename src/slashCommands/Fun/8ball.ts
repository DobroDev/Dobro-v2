import { SlashCommand } from '../../lib/structures/SlashCommand';
import axios from 'axios';

export default new SlashCommand({
	name: '8ball',
	description: 'Ask the 8ball about your future. (100% real!!)',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	options: [
		{
			name: 'question',
			description: 'The question you want to ask the 8ball',
			type: 'STRING',
			required: true,
		},
	],
	run: async ({ client, interaction }) => {
		const getQuestion = interaction.options.getString('question');

		let question = getQuestion;

		if (!question.includes('?')) {
			question = `${getQuestion}?`;
		}

		try {
			const response = await axios.get(
				`https://8ball.delegator.com/magic/JSON/${encodeURIComponent(question)}`
			);

			interaction.reply({
				embeds: [
					client.embeds.create({
						author: question,
						icon: client.user.displayAvatarURL(),
						description: `:8ball: ${response.data.magic.answer}`,
					}),
				],
			});
		} catch (err) {
			interaction.reply({
				content: 'The api seems to be down :(',
				ephemeral: true,
			});
		}
	},
});
