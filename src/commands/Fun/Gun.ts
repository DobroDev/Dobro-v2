import { MessageAttachment } from 'discord.js';
import { Command } from '../../lib/structures/Command';

export default new Command({
	name: 'gun',
	description: "Who's the badass now?",
	aliases: ['badass'],
	usage: 'gun [user]',
	examples: ['gun @Nickk', 'gun 775265751954096138'],
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message, args }) => {
		const { user } = await client.utils.ArgsMember(message, args, true);

		const img = new MessageAttachment(
			`https://api.popcat.xyz/gun?image=${user.displayAvatarURL({
				format: 'png',
				size: 512,
			})}`
		).attachment;

		await client.inlineReply(message, {
			embed: client.embeds.create({
				title: "Who's the badass now?",
				image: img as string,
			}),
		});
	},
});
