import { SlashCommand } from '../../lib/structures/SlashCommand';

export default new SlashCommand({
	name: 'membercount',
	description: 'Displays the server member count.',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	run: async ({ client, interaction }) => {
		interaction.reply({
			embeds: [
				client.embeds.create({
					fields: [
						{ name: 'Members', value: `${interaction.guild.memberCount}` },
					],
					timestamp: true,
				}),
			],
		});
	},
});
