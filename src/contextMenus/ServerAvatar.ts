import { ContextMenu } from '../lib/structures/ContextMenu';

export default new ContextMenu({
	name: 'server avatar',
	type: 'USER',
	inDevelopment: true,
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, ctx }) => {
		const member = await ctx.guild.members.fetch(ctx.targetId);

		ctx.reply({
			embeds: [
				client.embeds.create({
					author: member.displayName,
					icon: member.user.displayAvatarURL(),
					image: member.displayAvatarURL({ size: 1024 }),
					color: 'RANDOM',
				}),
			],
		});
	},
});
