import { SlashCommand } from '../../lib/structures/SlashCommand';
import { Gay } from 'discord-image-generation';
import { MessageAttachment } from 'discord.js';

export default new SlashCommand({
	name: 'gay',
	description: 'Makes a user gay.',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	options: [
		{
			name: 'target',
			description: 'The user you want to make gay.',
			type: 'USER',
			required: false,
		},
	],
	run: async ({ interaction }) => {
		const user = interaction.options.getUser('targer') || interaction.user;

		let img = await new Gay().getImage(
			user.displayAvatarURL({ dynamic: false, format: 'png' })
		);

		interaction.reply({
			files: [new MessageAttachment(img, `${user.username}isGay.png`)],
		});
	},
});
