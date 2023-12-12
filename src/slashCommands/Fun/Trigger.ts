import { SlashCommand } from '../../lib/structures/SlashCommand';
import { Triggered } from 'discord-image-generation';
import { MessageAttachment } from 'discord.js';

export default new SlashCommand({
	name: 'trigger',
	description: 'TRIGGERED!!!!!1',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	options: [
		{
			name: 'target',
			description: 'The user to trigger.',
			type: 'USER',
			required: false,
		},
	],
	run: async ({ interaction }) => {
		await interaction.deferReply().catch(() => {});
		const user = interaction.options.getUser('target') || interaction.user;

		let img = await new Triggered().getImage(
			user.displayAvatarURL({ dynamic: false, format: 'png' })
		);

		interaction.followUp({
			files: [new MessageAttachment(img, 'triggered.gif')],
		});
	},
});
