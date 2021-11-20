import { slashCommand } from '../../structures';
import { Gay } from 'discord-image-generation';
import { MessageAttachment } from 'discord.js';

export default new slashCommand({
	name: 'gay',
	description: 'Makes a user gay.',
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
		const user = interaction.options.getUser('user') || interaction.user;

		let img = await new Gay().getImage(
			user.displayAvatarURL({ dynamic: false, format: 'png' })
		);

		let attachment = new MessageAttachment(img, `${user.username}isGay.png`);
		interaction.reply({ files: [attachment] });
	},
});
