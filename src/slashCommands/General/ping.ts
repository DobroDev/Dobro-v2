import { title } from 'process';
import { slashCommand } from '../../utils/structures';
import { Embed } from '../../utils/utilities';

export default new slashCommand({
	name: 'ping',
	description: 'Displays bot latency.',
	Development: true,
	run: async ({ client, interaction }) => {
		const { Ping } = client.config.GeneralCommands;
		const date = Date.now();

		interaction.reply(Ping.awaitMsg).then(() => {
			interaction.editReply(
				Ping.Response.replace('(ping)', `${client.ws.ping}`).replace(
					'(msgping)',
					`${Date.now() - date}`
				)
			);
		});
	},
});
