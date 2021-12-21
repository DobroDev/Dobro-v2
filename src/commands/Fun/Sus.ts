import { Command } from '../../lib/structures/Command';
import Canvas from 'canvas';
import { MessageAttachment } from 'discord.js';

export default new Command({
	name: 'sus',
	description: 'Are you the imposter?',
	aliases: ['amogus', 'imposter'],
	usage: 'sus [user]',
	examples: ['sus @Nickk', 'sus 775265751954096138'],
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message, args }) => {
		const { user } = await client.utils.ArgsMember(message, args, true);

		const m = await client.inlineReply(message, {
			content: `${client.utils.getEmoji(
				client,
				'amogus'
			)} Are you the imposter....`,
		});

		const canvas = Canvas.createCanvas(1250, 900);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage(
			'https://i.imgur.com/3BizMhk.jpg'
		);
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		const avatar = await Canvas.loadImage(
			user.displayAvatarURL({ format: 'jpg' })
		);

		ctx.drawImage(avatar, 338, 75, 308, 258);
		const attachment = new MessageAttachment(
			canvas.toBuffer(),
			`amogus${user.username}.jpg`
		);

		m.edit({ files: [attachment] });
	},
});
