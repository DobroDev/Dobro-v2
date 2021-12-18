import { SlashCommand } from '../../lib/structures/SlashCommand';

export default new SlashCommand({
	name: 'howgay',
	description: 'Check how gay you actually are!',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	options: [
		{
			name: 'target',
			description: 'The user to check.',
			type: 'USER',
			required: false,
		},
	],
	run: async ({ client, interaction }) => {
		const user = interaction.options.getUser('target') || interaction.user;
		const gayness = Math.floor(Math.random() * 101);

		interaction.reply({
			embeds: [
				client.embeds.create({
					title: 'Gay Machine Calculator',
					description: `${user.username} is ${gayness}% Gay.`,
					color: 'RANDOM',
				}),
			],
		});
	},
});
