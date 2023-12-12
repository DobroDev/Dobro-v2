import ms from 'pretty-ms';
import { Command } from '../../lib/structures/Command';

export default new Command({
	name: 'uptime',
	description: 'Check how long the bot has been online for.',
	aliases: ['online', 'status'],
	usage: 'uptime',
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message }) => {
		await client.inlineReply(message, {
			content: `I have been online for **${ms(client.uptime, {
				compact: false,
				verbose: true,
				secondsDecimalDigits: 0,
			})}**`,
		});
	},
});
