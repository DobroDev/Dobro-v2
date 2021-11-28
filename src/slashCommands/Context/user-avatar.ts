import { contextMenu } from '../../structures';

export default new contextMenu({
	name: 'user avatar',
	type: 'USER',
	permsneeded: ['SEND_MESSAGES'],
	Guild: true,
	run: async ({ client, context }) => {
		const { Embed } = client.utils;

		const member = await context.guild.members.fetch(context.targetId);

		context.reply({
			embeds: [
				Embed({
					author: member.user.tag,
					icon: member.user.displayAvatarURL(),
					image: member.user.displayAvatarURL({ size: 1024 }),
				}),
			],
		});
	},
});
