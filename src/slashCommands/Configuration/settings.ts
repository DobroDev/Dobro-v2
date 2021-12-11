import { slashCommand } from '../../structures';
import { Role } from 'discord.js';
import Guild from '../../lib/models/guild';

export default new slashCommand({
	name: 'settings',
	description: 'Setup server settings.',
	permsneeded: ['MANAGE_GUILD'],
	Development: true,
	options: [
		{
			name: 'muterole_set',
			description: 'Sets the muterole in the guild.',
			type: 'SUB_COMMAND',
			options: [
				{
					name: 'role',
					description: 'The mute role.',
					type: 'ROLE',
					required: true,
				},
			],
		},
		{
			name: 'muterole_view',
			description: 'View the muterole in this guild.',
			type: 'SUB_COMMAND',
		},
	],
	run: async ({ client, interaction }) => {
		const { guild, options } = interaction;

		const selectedRole = options.getRole('role') as Role;

		switch (options.getSubcommand()) {
			case 'muterole_set': {
				await Guild.findOneAndUpdate(
					{
						Id: guild.id,
					},
					{ muteRole: selectedRole.id }
				).catch((err) => {
					client.consola.error(new Error(err));
					interaction.reply({
						content: client.config.Errors.internalError,
						ephemeral: true,
					});
					return;
				});

				interaction.reply({
					embeds: [
						client.utils.Embed({
							presets: 'SUCCESS',
							description: `Mute role has been set to ${selectedRole}`,
						}),
					],
				});

				break;
			}

			case 'muterole_view': {
				const data = await Guild.findOne({ Id: guild.id });

				const role = await guild.roles.fetch(data.muteRole);

				if (!role) {
					interaction.reply({
						embeds: [
							client.utils.Embed({
								presets: 'ERROR',
								description:
									'There is currently no mute role set for this guild',
							}),
						],
						ephemeral: true,
					});

					break;
				}

				interaction.reply({
					embeds: [
						client.utils.Embed({
							description: `The current mute role for this guild is <@&${role.id}>`,
							color: client.config.embedColors.default,
						}),
					],
				});

				break;
			}
		}
	},
});
