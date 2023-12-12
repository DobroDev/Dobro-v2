import { Parser } from 'expr-eval';
import { SlashCommand } from '../../lib/structures/SlashCommand';

export default new SlashCommand({
	name: 'math',
	description: 'Evaluates a math equation.',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	options: [
		{
			name: 'equation',
			description: 'The equation to be evaluated.',
			type: 'STRING',
			required: true,
		},
	],
	run: async ({ client, interaction }) => {
		try {
			const equation = interaction.options.getString('equation');
			const parser = new Parser();
			const math = parser.evaluate(equation);

			interaction.reply({
				embeds: [
					client.embeds.create({
						title: '\\➗ Math',
						fields: [
							{
								name: 'Expression',
								value: equation,
							},
							{
								name: 'Answer',
								value: math.toString(),
							},
						],
						color: 'RANDOM',
					}),
				],
			});
		} catch (err) {
			interaction.reply({
				embeds: [client.embeds.globalErr('Failed to evaluate the equation')],
			});
		}
	},
});
