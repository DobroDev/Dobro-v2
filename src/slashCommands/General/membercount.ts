import { slashCommand } from '../../structures';

export default new slashCommand({
	name: 'membercount',
	description: 'Displays server member count.',
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	run: async ({ client, interaction }) => {
		interaction.reply({
			embeds: [
				client.utils.Embed({
					fields: [
						{
							name: 'Members',
                            value: `${interaction.guild.memberCount}`,
						},
                    ],
                    timestamp: true
				}),
			],
			ephemeral: true,
		});
	},
});
