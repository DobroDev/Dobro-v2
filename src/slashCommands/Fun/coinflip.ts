import { slashCommand } from '../../structures';

export default new slashCommand({
	name: 'coinflip',
	description: 'Flips a coin!',
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	run: async ({ interaction }) => {
		const choices = ['Heads', 'Tails'];
		const output = choices[~~(Math.random() * choices.length)];

		await interaction.reply({
			content:
				'https://cdn.discordapp.com/emojis/776154502826557470.gif?size=64',
		});

		interaction.editReply({ content: `**${output}!**` });
	},
});
