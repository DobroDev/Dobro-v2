import { Command } from '../../lib/structures/Command';

export default new Command({
	name: 'roleinfo',
	description: 'Displays information about a role.',
	aliases: ['roleinformation', 'role', 'aboutrole'],
	usage: 'roleinfo <role>',
	minArgs: 1,
	examples: ['roleinfo @role', 'roleinfo 916648277519261747'],
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message, args }) => {
		const role =
			message.mentions.roles.first() ||
			message.guild.roles.cache.find(
				(r) => r.id === args[0] || r.name === args[0]
			);

		if (!role) {
			client.inlineReply(message, {
				embed: client.embeds.globalErr(
					'Please mention or provide a valid role ID or name.'
				),
			});
			return;
		}

		const allMembers =
			role.members.size < 25
				? role.members.map((m) => `<@${m.id}>`).join(' ')
				: `${role.members
						.map((m) => `<@${m.id}>`)
						.slice(0, 25)
						.join(' ')} and more...`;

		client.inlineReply(message, {
			embed: client.embeds.create({
				title: 'Role Info',
				description: `<@&${role.id}>`,
				fields: [
					{
						name: 'ID',
						value: role.id,
						inline: true,
					},
					{
						name: 'Position',
						value: `${role.position}`,
						inline: true,
					},
					{
						name: `Members - [${role.members.size}]`,
						value: role.members.size > 0 ? allMembers : 'None.',
					},
					{
						name: 'Created',
						value: `<t:${Math.floor(
							role.createdTimestamp / 1000
						)}:f> (<t:${Math.floor(role.createdTimestamp / 1000)}:R>)`,
					},
				],
				color: role.hexColor,
				timestamp: true,
			}),
		});
	},
});
