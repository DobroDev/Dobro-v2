import { slashCommand } from '../../structures';
import ms from 'pretty-ms';

export default new slashCommand({
	name: 'uptime',
	description: 'Check how long the bot has been online for.',
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	run: async ({ client, interaction }) => {
		const { Uptime } = client.config.GeneralCommands;

		interaction.reply({
			content: Uptime.message.replace(
				'(time)',
				`${ms(client.uptime, {
					compact: false,
					verbose: true,
					secondsDecimalDigits: 0,
				})}`
			),
		});
	},
});
