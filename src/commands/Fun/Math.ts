import { Parser } from 'expr-eval';
import { Command } from '../../lib/structures/Command';

export default new Command({
	name: 'math',
	description: 'Evaluates a math equation.',
	aliases: ['calc', 'calculate'],
	usage: 'math <equation>',
	minArgs: 1,
	examples: ['math 1 + 1'],
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message, args }) => {
		try {
			const equation = args.slice(0).join(' ');
			const parser = new Parser();
			const math = parser.evaluate(equation);

			client.utils.inlineReply(message, {
				embed: client.embeds.create({
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
			});
		} catch (err) {
			client.utils.inlineReply(message, {
				embed: client.embeds.globalErr('Failed to evaluate the equation'),
			});
		}
	},
});
