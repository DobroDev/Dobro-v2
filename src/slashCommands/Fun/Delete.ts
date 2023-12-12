import { SlashCommand } from '../../lib/structures/SlashCommand';
import { Delete } from 'discord-image-generation';
import { MessageAttachment } from 'discord.js';

export default new SlashCommand({
	name: 'delete',
	description: 'Delete the trash!',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	options: [
		{
			name: 'target',
			description: 'The user you want to delete.',
			type: 'USER',
			required: false,
		},
	],
	run: async ({ interaction }) => {
		const user = interaction.options.getUser('target') || interaction.user;

		const img = await new Delete().getImage(
			user.displayAvatarURL({ dynamic: false, format: 'png' })
		);

		interaction.reply({
			files: [new MessageAttachment(img, `${user.username}isTrash.png`)],
		});
	},
});
