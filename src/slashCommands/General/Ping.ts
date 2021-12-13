import { SlashCommand } from '../../lib/structures/SlashCommand';

export default new SlashCommand({
	name: 'ping',
	description: 'Displays bot latency.',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	run: async ({ client, interaction }) => {
		const date = Date.now();

		await interaction.reply('Pinging...');
		interaction.editReply(
			`**Pong!** Bot Latency: \`${
				Date.now() - date
			}ms\` API Latency: \`${Math.round(client.ws.ping)}ms\``
		);
	},
});
