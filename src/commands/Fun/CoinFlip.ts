import { Command } from '../../lib/structures/Command';

export default new Command({
	name: 'coinflip',
	description: 'Flips a coin!',
	aliases: ['cf'],
	usage: 'coinflip',
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message }) => {
		const { inlineReply } = client.utils;

		const choices = ['Heads', 'Tails'];
		const output = choices[~~(Math.random() * choices.length)];

		const m = await message.channel.send(
			'https://cdn.discordapp.com/emojis/776154502826557470.gif?size=64'
		);

		setTimeout(() => {
			m.edit(`**${output}!**`);
		}, 500);
	},
});
