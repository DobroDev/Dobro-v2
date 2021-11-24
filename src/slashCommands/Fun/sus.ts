import { slashCommand } from '../../structures';
import Canvas from 'canvas';
import { MessageAttachment } from 'discord.js';

export default new slashCommand({
	name: 'sus',
	description: 'Are you the imposter?',
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
	run: async ({ client, interaction }) => {
		const { getMember, getEmoji } = client.utils;
		const { Sus } = client.config.FunCommands;
		const member = await getMember(interaction, 'INTERACTION', 'user');

		await interaction.reply({
			content: `${getEmoji(client, 'amogus')} ${Sus.message}`,
		});

		const canvas = Canvas.createCanvas(1250, 900);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage(Sus.images[0]);

		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		const av = await Canvas.loadImage(
			member.displayAvatarURL({ format: 'jpg' })
		);
		ctx.drawImage(av, 338, 75, 308, 258);

		await interaction.editReply({
			files: [new MessageAttachment(canvas.toBuffer(), 'amogus.jpg')],
		});
	},
});
