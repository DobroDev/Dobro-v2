import { Command } from '../../lib/structures/Command';

export default new Command({
	name: 'rolldice',
	description: 'Rolls a dice.',
	aliases: ['dice', 'rolld', 'diceroll'],
	usage: 'rolldice',
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message }) => {
		const Sides = {
			1: 'https://cdn.discordapp.com/attachments/637105382631669760/675091831746199552/dice-1.png',
			2: 'https://cdn.discordapp.com/attachments/637105382631669760/675091832966873088/dice-2.png',
			3: 'https://cdn.discordapp.com/attachments/637105382631669760/675091834485342238/dice-3.png',
			4: 'https://cdn.discordapp.com/attachments/637105382631669760/675091835575861248/dice-4.png',
			5: 'https://cdn.discordapp.com/attachments/637105382631669760/675091837228285982/dice-5.png',
			6: 'https://cdn.discordapp.com/attachments/637105382631669760/675091838419337256/dice-6.png',
		};

		const side =
			Object.keys(Sides)[Math.floor(Math.random() * Object.keys(Sides).length)];

		const m = await message.channel.send({
			embeds: [
				client.embeds.create({
					description: 'Rolling...',
					color: 'RANDOM',
				}),
			],
        });
        
        m.edit({
					embeds: [
						client.embeds.create({
							title: '🎲 Dice Rolled',
							description: `The dice was rolled and landed on **${side}**`,
							thumbnail: Object.values(Sides)[Object.keys(Sides).indexOf(side)],
							timestamp: true,
						}),
					],
				});
	},
});
