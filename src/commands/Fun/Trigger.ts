import { Command } from '../../lib/structures/Command';
import { Triggered } from 'discord-image-generation';
import { MessageAttachment } from 'discord.js';

export default new Command({
	name: 'trigger',
	description: 'TRIGGERED!!!!!1',
	aliases: ['rage'],
	usage: 'trigger [user]',
	examples: ['trigger @Nickk', 'trigger 775265751954096138'],
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message, args }) => {
		const { user } = await client.utils.ArgsMember(message, args, true);

		let img = await new Triggered().getImage(
			user.displayAvatarURL({ dynamic: false, format: 'png' })
		);

		message.channel.send({
			files: [new MessageAttachment(img, 'triggered.gif')],
		});
	},
});
