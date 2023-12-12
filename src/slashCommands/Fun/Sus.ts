import { SlashCommand } from '../../lib/structures/SlashCommand';
import Canvas from 'canvas';
import { MessageAttachment } from 'discord.js';

export default new SlashCommand({
	name: 'sus',
	description: 'Are you the imposter?',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	options: [
		{
			name: 'target',
			description: 'The imposter.',
			type: 'USER',
			required: false,
		},
	],
	run: async ({ interaction }) => {
		await interaction.deferReply().catch(() => {});

		const user = interaction.options.getUser('target') || interaction.user;

		const canvas = Canvas.createCanvas(1250, 900);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage(
			'https://i.imgur.com/3BizMhk.jpg'
		);
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		const avatar = await Canvas.loadImage(
			user.displayAvatarURL({ format: 'jpg' })
		);

		ctx.drawImage(avatar, 338, 75, 308, 258);
		const attachment = new MessageAttachment(
			canvas.toBuffer(),
			`amogus${user.username}.jpg`
		);

		interaction.followUp({ files: [attachment] });
	},
});
