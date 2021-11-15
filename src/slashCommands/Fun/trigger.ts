import { slashCommand } from '../../structures';
import { Triggered } from 'discord-image-generation';
import { MessageAttachment } from 'discord.js';

export default new slashCommand({
	name: 'trigger',
	description: 'TRIGGERED!!!!!1',
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	options: [
		{
			name: 'user',
			description: 'The user you want to trigger',
			type: 'USER',
			required: false,
		},
	],
	run: async ({ interaction }) => {
		const user = interaction.options.getUser('user') || interaction.user;

		const img = await new Triggered().getImage(
			user.displayAvatarURL({ dynamic: false, format: 'png' })
		);

		const attachment = new MessageAttachment(
			img,
			`${user.username}isTriggered.gif`
		);

		interaction.reply({ files: [attachment] });
	},
});
