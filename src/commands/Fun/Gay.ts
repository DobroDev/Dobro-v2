import { Command } from '../../lib/structures/Command';
import { Gay } from 'discord-image-generation';
import { MessageAttachment } from 'discord.js';

export default new Command({
	name: 'gay',
	description: 'Makes a user gay.',
	aliases: ['gae'],
	usage: 'gay [user]',
	examples: ['gay @Nickk', 'gay 775265751954096138'],
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message, args }) => {
		const { user } = await client.utils.ArgsMember(message, args, true);

		let img = await new Gay().getImage(
			user.displayAvatarURL({ dynamic: false, format: 'png' })
		);

		message.channel.send({
			files: [new MessageAttachment(img, `${user.username}isGay.png`)],
		});
	},
});
