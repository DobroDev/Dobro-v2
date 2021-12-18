import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { Command } from '../../lib/structures/Command';

export default new Command({
	name: 'rockpaperscissors',
	description: 'Rock, paper or scissors?',
	aliases: ['rps'],
	usage: 'rockpaperscissors',
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message }) => {
		const player = message.author;
		const choices = ['✌️', '🤜', '✋'];
		const BotChoice = choices[~~(Math.random() * choices.length)];

		function row(a: boolean, b: boolean, c: boolean) {
			return new MessageActionRow().addComponents(
				new MessageButton()
					.setStyle('DANGER')
					.setEmoji('⛰️')
					.setCustomId('rock')
					.setDisabled(a),
				new MessageButton()
					.setStyle('SECONDARY')
					.setEmoji('🧻')
					.setCustomId('paper')
					.setDisabled(b),
				new MessageButton()
					.setStyle('SUCCESS')
					.setEmoji('✂️')
					.setCustomId('scissors')
					.setDisabled(c)
			);
		}

		const m = await message.channel.send({
			embeds: [
				client.embeds.create({
					description: 'Rock, Paper or Scissors?',
					color: 'RANDOM',
				}),
			],
			components: [row(false, false, false)],
		});

		const collector = m.channel.createMessageComponentCollector({
			componentType: 'BUTTON',
			time: 30000,
		});

		const results = [
			`<@${player.id}> wins!`,
			`<@${client.user.id}> wins!`,
			`Tie.`,
		];

		let result: string;

		collector.on('collect', async (i) => {
			if (i.user.id !== player.id)
				return i.reply({
					content: "This isn't your game.",
					ephemeral: true,
				});

			if (i.customId === 'rock') {
				if (BotChoice === '✌️') result = results[0];
				if (BotChoice === '✋') result = results[1];
				if (BotChoice === '🤜') result = results[2];

				const resultEmbed = new MessageEmbed()
					.addField(player.username, '🤜', true)
					.addField('VS', '⚡', true)
					.addField('Bot', BotChoice, true)
					.addField('Result:', result)
					.setColor('RANDOM');

				m.edit({ embeds: [resultEmbed], components: [row(true, true, true)] });
			}

			if (i.customId === 'paper') {
				if (BotChoice === '✌️') result = results[1];
				if (BotChoice === '✋') result = results[2];
				if (BotChoice === '🤜') result = results[0];

				const resultEmbed = new MessageEmbed()
					.addField(player.username, '✋', true)
					.addField('VS', '⚡', true)
					.addField('Bot', BotChoice, true)
					.addField('Result:', result)
					.setColor('RANDOM');

				m.edit({ embeds: [resultEmbed], components: [row(true, true, true)] });
			}

			if (i.customId === 'scissors') {
				if (BotChoice === '✌️') result = results[2];
				if (BotChoice === '✋') result = results[0];
				if (BotChoice === '🤜') result = results[1];

				const resultEmbed = new MessageEmbed()
					.addField(player.username, '✌️', true)
					.addField('VS', '⚡', true)
					.addField('Bot', BotChoice, true)
					.addField('Result:', result)
					.setColor('RANDOM');

				m.edit({ embeds: [resultEmbed], components: [row(true, true, true)] });
			}

			await i.deferUpdate();
		});
	},
});
