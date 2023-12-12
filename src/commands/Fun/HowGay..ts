import { Command } from '../../lib/structures/Command';

export default new Command({
	name: 'howgay',
	description: 'Check how gay you actually are!',
	aliases: ['howsgae', 'gaymeter'],
	usage: 'howgay [user]',
	examples: ['howgay @Nickk', 'howgay 775265751954096138'],
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message, args }) => {
		const { user } = await client.utils.ArgsMember(message, args, true);
		const gayness = Math.floor(Math.random() * 101);

		await client.inlineReply(message, {
			embed: client.embeds.create({
				title: 'Gay Machine Calculator',
				description: `${user.username} is ${gayness}% Gay.`,
				color: 'RANDOM',
			}),
		});
	},
});
