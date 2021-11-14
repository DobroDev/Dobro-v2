import { slashCommand } from '../../structures';
import { Parser } from 'expr-eval';

export default new slashCommand({
	name: 'math',
	description: 'Evaluates a math equation.',
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	options: [
		{
			name: 'equation',
			description: 'Thq equation to be evaluated.',
			type: 'STRING',
			required: true,
		},
	],
	run: async ({ client, interaction }) => {
		const { Math } = client.config.FunCommands;
		const { Embed } = client.utils;
		const equation = interaction.options.getString('equation');

		try {
			const parser = new Parser();
			const math = parser.evaluate(equation);

			interaction.reply({
				embeds: [
					Embed({
						title: Math.Title,
						fields: [
							{ name: Math.Fields[0], value: equation },
							{ name: Math.Fields[1], value: `${math.toString()}` },
						],
					}),
				],
			});
		} catch (error) {
			interaction.reply({
				content: 'Failed to evaluate the question.',
				ephemeral: true,
			});
		}
	},
});
