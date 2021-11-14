import { slashCommand } from '../../structures';
import { Delete } from 'discord-image-generation';
import { MessageAttachment } from 'discord.js';

export default new slashCommand({
	name: 'delete',
	description: 'Delete the trash!',
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	options: [
		{
			name: 'user',
			description: 'The user you want to trigger',
			type: 'USER',
			required: false,
		},
	],
	run: async ({ interaction }) => {
		const user = interaction.options.getUser('user') || interaction.user;

		const img = await new Delete().getImage(
			user.displayAvatarURL({ dynamic: false, format: 'png' })
		);

		const attactment = new MessageAttachment(
			img,
			`${user.username}isTrash.png`
		);

		interaction.reply({ files: [attactment] });
	},
});
