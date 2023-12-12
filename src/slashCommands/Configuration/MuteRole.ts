import { Role } from 'discord.js';
import { SlashCommand } from '../../lib/structures/SlashCommand';

export default new SlashCommand({
	name: 'muterole',
	description: 'Configures the muterole for this guild.',
	userPerms: ['MANAGE_GUILD'],
	inDevelopment: true,
	options: [
		{
			name: 'set',
			description: 'Sets the mute role for this guild.',
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
			name: 'remove',
			description: 'Removes the mute role for this guild.',
			type: 'SUB_COMMAND',
		},
		{
			name: 'view',
			description: 'View the mute role for this guild.',
			type: 'SUB_COMMAND',
		},
	],
	run: async ({ client, interaction }) => {
		const { options, guild: g } = interaction;

		const chosenRole = options.getRole('role') as Role;

		switch (options.getSubcommand()) {
			case 'set': {
				await client.db
					.updateGuild(g.id, {
						$set: {
							muteRole: chosenRole.id,
						},
					})
					.catch((err: any) => {
						console.log(err);
						interaction.reply({
							embeds: [
								client.embeds.globalErr(
									'Encountered an internal error with the database... Please contact a developer!'
								),
							],
						});
						return;
					});

				interaction.reply({
					embeds: [
						client.embeds.globalSuccess(
							`Mute role has been set to ${chosenRole}`
						),
					],
				});

				break;
			}

			case 'remove': {
				await client.db
					.updateGuild(g.id, {
						$unset: {
							muteRole: '',
						},
					})
					.catch((err: any) => {
						client.logger.error(err);
						interaction.reply({
							embeds: [
								client.embeds.globalErr(
									'Encountered an internal error with the database... Please contact a developer!'
								),
							],
						});
						return;
					});

				interaction.reply({
					embeds: [
						client.embeds.globalSuccess(
							'Successfully removed the mute role for this guild.'
						),
					],
				});

				break;
			}

			case 'view': {
				const guild = await client.db.getGuild(g.id);

				const muteRole = g.roles.cache.find((r) => r.id === guild.muteRole);

				if (!muteRole) {
					interaction.reply({
						embeds: [
							client.embeds.globalErr(
								'There is currently no mute role set for this guild.'
							),
						],
					});
					return;
				}

				interaction.reply({
					embeds: [
						client.embeds.create({
							description: `The current muterole set for this guild is <@&${muteRole.id}>.`,
						}),
					],
				});

				break;
			}
		}
	},
});
