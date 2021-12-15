import { Command } from '../../lib/structures/Command';
import { Delete } from 'discord-image-generation';
import { MessageAttachment } from 'discord.js';

export default new Command({
	name: 'delete',
	description: 'Delete the trash!',
	aliases: ['del'],
	usage: 'delete [user]',
	examples: ['delete @Nickk', 'delete 775265751954096138'],
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message, args }) => {
		const { user } = await await client.utils.ArgsMember(message, args, true);

		const img = await new Delete().getImage(
			user.displayAvatarURL({ dynamic: false, format: 'png' })
		);

		message.channel.send({
			files: [new MessageAttachment(img, `${user.username}isTrash.png`)],
		});
	},
});
