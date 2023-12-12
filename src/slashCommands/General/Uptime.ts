import { SlashCommand } from '../../lib/structures/SlashCommand';
import ms from 'pretty-ms';

export default new SlashCommand({
	name: 'uptime',
	description: 'Check how long the bot has been online for.',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	run: async ({ client, interaction }) => {
		interaction.reply({
			content: `I have been online for **${ms(client.uptime, {
				compact: false,
				verbose: true,
				secondsDecimalDigits: 0,
			})}**`,
		});
	},
});
