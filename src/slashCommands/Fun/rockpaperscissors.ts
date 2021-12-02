import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { slashCommand } from '../../structures';

export default new slashCommand({
	name: 'rockpaperscissors',
	description: 'Rock, paper or scrissors?',
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	run: async ({ client, interaction }) => {
		const { RPS } = client.config.FunCommands;
		const { Embed } = client.utils;

		const player = interaction.user;
		const choices = ['✌️', '🤜', '✋'];
		const BotChoice = choices[~~(Math.random() * choices.length)];

		const row = new MessageActionRow().addComponents(
			new MessageButton().setStyle('DANGER').setEmoji('⛰️').setCustomId('rock'),
			new MessageButton()
				.setStyle('SECONDARY')
				.setEmoji('🧻')
				.setCustomId('paper'),
			new MessageButton()
				.setStyle('SUCCESS')
				.setEmoji('✂️')
				.setCustomId('scissors')
		);

		await interaction.reply({
			embeds: [Embed({ description: RPS.Question })],
			components: [row],
		});

		const collector = interaction.channel.createMessageComponentCollector({
			componentType: 'BUTTON',
			time: 30000,
		});

		const results = [
			`<@${player.id}> wins!`,
			`<@${client.user.id}> wins!`,
			`Tie.`,
		];

		let result: any;

		collector.on('collect', async (collected) => {
			if (collected.user.id !== player.id)
				return collected.reply({
					content: RPS.InvalidPlayer,
					ephemeral: true,
				});

			if (collected.customId === 'rock') {
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
					components: [],
				});
			}

			if (collected.customId === 'paper') {
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
					components: [],
				});
			}

			if (collected.customId === 'scissors') {
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
					components: [],
				});
			}

			await collected.deferUpdate();
		});
	},
});
