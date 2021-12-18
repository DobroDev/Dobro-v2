import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { SlashCommand } from '../../lib/structures/SlashCommand';

export default new SlashCommand({
	name: 'rockpaperscissors',
	description: 'Rock, Paper or Scissors?',
	userPerms: ['SEND_MESSAGES'],
	inDevelopment: true,
	run: async ({ client, interaction }) => {
		const player = interaction.user;
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

		await interaction.reply({
			embeds: [
				client.embeds.create({
					description: 'Rock, Paper or Scissors?',
					color: 'RANDOM',
				}),
			],
			components: [row(false, false, false)],
		});

		const collector = interaction.channel.createMessageComponentCollector({
			componentType: 'BUTTON',
			time: 30000,
		});

		let result: string;

		const results = [
			`<@${player.id}> wins!`,
			`<@${client.user.id}> wins!`,
			`Tie.`,
		];

		collector.on('collect', async (i) => {
			if (i.user.id !== player.id)
				return i.reply({
					content: "That isn't your game.",
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

				await interaction.editReply({
					embeds: [resultEmbed],
					components: [row(true, true, true)],
				});
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

				await interaction.editReply({
					embeds: [resultEmbed],
					components: [row(true, true, true)],
				});
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

				await interaction.editReply({
					embeds: [resultEmbed],
					components: [row(true, true, true)],
				});
			}

			await i.deferUpdate();
		});
	},
});
