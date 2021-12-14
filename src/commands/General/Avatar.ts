import { Command } from '../../lib/structures/Command';

export default new Command({
	name: 'avatar',
	description: "Displays user's avatar.",
	aliases: ['av', 'pfp'],
	usage: 'avatar [user]',
	examples: ['avatar @Nickk', 'avatar 775265751954096138'],
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message, args }) => {
		const member = await client.utils.ArgsMember(message, args, true);

		message.channel.send({
			embeds: [
				client.embeds.create({
					author: member.user.tag,
					icon: member.user.displayAvatarURL(),
					image: member.user.displayAvatarURL({ size: 1024 }),
					color: 'RANDOM',
				}),
			],
		});
	},
});
