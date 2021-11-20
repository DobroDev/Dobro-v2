import { MessageActionRow, MessageButton, version } from 'discord.js';
import moment from 'moment';
import ms from 'pretty-ms';
import { slashCommand } from '../../structures';
import os from 'os';

export default new slashCommand({
	name: 'stats',
	description: 'Displays bot stats.',
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	run: async ({ client, interaction }) => {
		const { Embed } = client.utils;
		const { Stats } = client.config.GeneralCommands;

		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel('General')
				.setEmoji('📜')
				.setStyle('SECONDARY')
				.setCustomId('page1'),
			new MessageButton()
				.setLabel('System')
				.setEmoji('⚙')
				.setStyle('SECONDARY')
				.setCustomId('page2')
		);

		const disabled = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel('General')
				.setEmoji('📜')
				.setStyle('SECONDARY')
				.setCustomId('page1')
				.setDisabled(true),
			new MessageButton()
				.setLabel('System')
				.setEmoji('⚙')
				.setStyle('SECONDARY')
				.setCustomId('page2')
				.setDisabled(true)
		);

		const Em1 = Embed({
			author: `${client.user.username}'s Stats`,
			icon: client.user.displayAvatarURL(),
			description: Stats.Description,
			fields: [
				{
					name: 'Library & Version',
					value: `Discord.js v${version}`,
					inline: true,
				},
				{ name: 'Developers', value: Stats.Developers, inline: true },
				{
					name: '**__General__**',
					value: `\`\`\`yml\nUsername: ${client.user.username}\nID: ${
						client.user.id
					}\nCreated: ${moment(client.user.createdTimestamp).format(
						'LL LT'
					)}\nServers: ${client.guilds.cache.size}\nUsers: ${
						client.users.cache.size
					}\nUptime: ${ms(client.uptime, {
						compact: false,
						verbose: true,
						secondsDecimalDigits: 0,
					})}\nPing: ${client.ws.ping}ms\`\`\``,
				},
			],
		});

		const cpu = os.cpus()[0];

		const Em2 = Embed({
			fields: [
				{
					name: '**__System__**',
					value: `\`\`\`yml\nOS: ${process.platform} (${process.arch})\nCPU: ${
						cpu.model
					}\nOS Uptime: ${ms(os.uptime() * 1000, {
						compact: false,
						verbose: true,
						secondsDecimalDigits: 0,
					})}\nMemory Used: ${Math.round(
						process.memoryUsage().heapUsed / 1024 / 1024
					)} MB\nTotal Memory: ${Math.round(
						os.totalmem() / 1024 / 1024
					)} MB\`\`\``,
				},
			],
		});

		await interaction.reply({ embeds: [Em1], components: [row] });

		const collector = interaction.channel.createMessageComponentCollector({
			componentType: 'BUTTON',
			time: 30000,
		});

		collector.on('collect', async (i) => {
			if (i.user.id !== interaction.user.id) {
				return i.reply({
					content: Stats.invalidUser,
					ephemeral: true,
				});
			}

			if (i.customId === 'page1') {
				interaction.editReply({ embeds: [Em1], components: [row] });
			}

			if (i.customId === 'page2') {
				interaction.editReply({ embeds: [Em2], components: [row] });
			}

			i.deferUpdate();
		});

		collector.on('end', async (button, i) => {
			if (i === 'time') {
				interaction.editReply({ components: [disabled] });
			}
		});
	},
});
