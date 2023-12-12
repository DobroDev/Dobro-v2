import { MessageAttachment } from 'discord.js';
import { SlashCommand } from '../../lib/structures/SlashCommand';

export default new SlashCommand({
	name: 'gun',
	description: "Who's the badass now?",
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	options: [
		{
			name: 'target',
			description: 'The badass.',
			type: 'USER',
			required: false,
		},
	],
	run: async ({ client, interaction }) => {
		const user = interaction.options.getUser('target') || interaction.user;

		const img = new MessageAttachment(
			`https://api.popcat.xyz/gun?image=${user.displayAvatarURL({
				format: 'png',
				size: 512,
			})}`
		).attachment;

		interaction.reply({
			embeds: [
				client.embeds.create({
					title: "Who's the badass now?",
					image: img as string,
				}),
			],
		});
	},
});
