import { Command } from '../../lib/structures/Command';

export default new Command({
	name: 'ping',
	description: 'Displays bot latency.',
	aliases: ['pong', 'latency'],
	usage: 'ping',
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message }) => {
		const date = Date.now();

		const msg = await message.channel.send('Pinging...');
		msg.edit(
			`**Pong!** Bot Latency: \`${
				Date.now() - date
			}ms\` API Latency: \`${Math.round(client.ws.ping)}ms\``
		);
	},
});
