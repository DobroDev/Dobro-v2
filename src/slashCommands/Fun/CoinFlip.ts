import { SlashCommand } from '../../lib/structures/SlashCommand';

export default new SlashCommand({
	name: 'coinflip',
	description: 'Flips a coin!',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	run: async ({ interaction }) => {
		const choices = ['Heads', 'Tails'];
		const output = choices[~~(Math.random() * choices.length)];

		await interaction.reply({
			content:
				'https://cdn.discordapp.com/emojis/776154502826557470.gif?size=64',
		});

		setTimeout(() => {
			interaction.editReply({ content: `**${output}!**` });
		}, 500);
	},
});
