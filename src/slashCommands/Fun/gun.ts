import { MessageAttachment } from 'discord.js';
import { slashCommand } from '../../structures';

export default new slashCommand({
	name: 'gun',
	description: "Who's the badass now?",
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	options: [
		{
			name: 'user',
			description: 'The badass.',
			type: 'USER',
			required: false,
		},
	],
	run: async ({ client, interaction }) => {
		const { Gun } = client.config.FunCommands;
		const { Embed } = client.utils;
		const user = interaction.options.getUser('user') || interaction.user;

		const img = new MessageAttachment(
			`https://api.popcat.xyz/gun?image=${user.displayAvatarURL({
				format: 'png',
				size: 512,
			})}`
		).attachment;

		interaction.reply({
			embeds: [Embed({ title: Gun.Title, image: img as string })],
		});
	},
});
