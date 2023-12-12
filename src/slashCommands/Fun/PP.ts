import { SlashCommand } from '../../lib/structures/SlashCommand';

export default new SlashCommand({
	name: 'pp',
	description: 'Check how big your pp actually is.',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	options: [
		{
			name: 'target',
			description: 'The user you want to check.',
			type: 'USER',
			required: false,
		},
	],
	run: async ({ client, interaction }) => {
		const user = interaction.options.getUser('target') || interaction.user;

		const pp = makePP(Math.floor(Math.random() * 10) + 1 - 1 + 1);

		interaction.reply({
			embeds: [
				client.embeds.create({
					title: '`PP Size Machine`',
					description: `${user.username}'s penis\n8${pp}D`,
					color: 'RANDOM',
				}),
			],
		});
	},
});

function makePP(length: number) {
	let result = '';
	const characters = '===============';
	const chL = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * chL));
	}
	return result;
}
