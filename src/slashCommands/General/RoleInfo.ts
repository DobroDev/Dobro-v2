import { Role } from 'discord.js';
import { SlashCommand } from '../../lib/structures/SlashCommand';

export default new SlashCommand({
	name: 'roleinfo',
	description: 'Displays information about a role.',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	options: [
		{
			name: 'role',
			description: 'The role.',
			type: 'ROLE',
			required: true,
		},
	],
	run: async ({ client, interaction }) => {
		const role = interaction.options.getRole('role') as Role;

		const allMembers =
			role.members.size < 25
				? role.members.map((m) => `<@${m.id}>`).join(' ')
				: `${role.members
						.map((m) => `<@${m.id}>`)
						.slice(0, 25)
						.join(' ')} and more...`;
		interaction.reply({
			embeds: [
				client.embeds.create({
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
			],
		});
	},
});
