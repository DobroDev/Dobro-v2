import { slashCommand } from '../../structures';

export default new slashCommand({
	name: 'rolldice',
	description: 'Rolls a dice.',
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	run: async ({ client, interaction }) => {
		const { RollDice } = client.config.FunCommands;
		const { Embed } = client.utils;

		const Sides = {
			1: RollDice.Sides[0],
			2: RollDice.Sides[1],
			3: RollDice.Sides[2],
			4: RollDice.Sides[3],
			5: RollDice.Sides[4],
			6: RollDice.Sides[5],
		};

		const side =
			Object.keys(Sides)[Math.floor(Math.random() * Object.keys(Sides).length)];

		await interaction.reply({
			embeds: [Embed({ description: RollDice.Rolling })],
		});

		interaction.editReply({
			embeds: [
				Embed({
					title: RollDice.Title,
					description: RollDice.Description.replace('(result)', side),
					thumbnail: Object.values(Sides)[Object.keys(Sides).indexOf(side)],
					timestamp: true,
				}),
			],
		});
	},
});
