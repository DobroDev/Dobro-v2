import { slashCommand } from '../../structures';

export default new slashCommand({
	name: 'howgay',
	description: 'See how gay you actually are!',
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	options: [
		{
			name: 'user',
			description: 'The user you want to make gay.',
			type: 'USER',
			required: false,
		},
	],
	run: async ({ client, interaction }) => {
		const { HowGay } = client.config.FunCommands;
		const { Embed, getUser } = client.utils;

		const user = getUser(interaction, 'user');
		const gayness = Math.floor(Math.random() * 101);

		interaction.reply({
			embeds: [
				Embed({
					title: HowGay.Title,
					description: HowGay.Description.replace(
						'(user)',
						user.username
					).replace('(gayness)', `${gayness}`),
				}),
			],
		});
	},
});
