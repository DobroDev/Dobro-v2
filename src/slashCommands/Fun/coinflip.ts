import { slashCommand } from '../../structures';

export default new slashCommand({
	name: 'conflip',
	description: 'Flips a coin!',
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	run: async ({ client, interaction }) => {
		const { Coinflip } = client.config.FunCommands;
		const { Embed } = client.utils;

		const choices = ['Heads', 'Tails'];
		const output = choices[~~(Math.random() * choices.length)];

		interaction.reply({
			embeds: [
				Embed({
					title: Coinflip.Title,
					description: Coinflip.Description.replace('(result)', output),
				}),
			],
		});
	},
});
