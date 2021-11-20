import { slashCommand } from '../../structures';

export default new slashCommand({
	name: 'pp',
	description: 'Displays the size of your dick (100% accurate!!!!)',
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	options: [
		{
			name: 'user',
			description: "The user who's pp you wanna see 😏",
			type: 'USER',
			required: false,
		},
	],
	run: async ({ client, interaction }) => {
		const { PP } = client.config.FunCommands;
		const { Embed, getUser } = client.utils;
		const user = getUser(interaction, 'user');

		function makePP(length: number) {
			let result = '';
			const characters = '===============';
			const chL = characters.length;
			for (var i = 0; i < length; i++) {
				result += characters.charAt(Math.floor(Math.random() * chL));
			}
			return result;
		}

		const pps = makePP(Math.floor(Math.random() * 10) + 1 - 1 + 1);

		interaction.reply({
			embeds: [
				Embed({
					title: PP.Title,
					description: PP.Description.replace('(user)', user.username).replace(
						'(penis)',
						`8${pps}D`
					),
				}),
			],
		});
	},
});
