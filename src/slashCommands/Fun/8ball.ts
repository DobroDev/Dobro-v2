import { slashCommand } from '../../structures';
import axios from 'axios';

export default new slashCommand({
	name: '8ball',
	description: 'Ask the 8ball about your future! (100% real!!)',
	permsneeded: ['SEND_MESSAGES'],
	options: [
		{
			name: 'question',
			description: 'The question you want to ask the 8ball',
			type: 'STRING',
			required: true,
		},
	],
	run: async ({ client, interaction, args }) => {
		const { eightball } = client.config.FunCommands;
		const { Embed } = client.utils;
		const getQuestion = interaction.options.getString('question');

		let question = getQuestion;

		if (!question.includes('?')) {
			question = question + '?';
		}

		try {
			const response = await axios.get(
				`https://8ball.delegator.com/magic/JSON/${encodeURIComponent(question)}`
			);

			await interaction.reply({
				embeds: [
					Embed({
						author: question,
						icon: client.user.displayAvatarURL(),
						description: eightball.embed.replace(
							'(response)',
							`${response.data.magic.answer}`
						),
					}),
				],
			});
		} catch (error) {
			interaction.reply({
				embeds: [
					Embed({
						presets: 'ERROR',
						description: 'The api seems to be down :(',
					}),
				],
				ephemeral: true,
			});
		}
	},
});
