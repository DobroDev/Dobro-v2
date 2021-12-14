import { MessageActionRow, MessageButton, version } from 'discord.js';
import { Command } from '../../lib/structures/Command';
import moment from 'moment';
import ms from 'pretty-ms';
import os from 'os';

export default new Command({
	name: 'stats',
	description: 'Displays bot stats.',
	aliases: ['botinfo', 'binfo'],
	usage: 'botinfo',
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message }) => {
		const cpu = os.cpus()[0];

		function row(state1: boolean, state2: boolean) {
			return new MessageActionRow().addComponents(
				new MessageButton()
					.setLabel('General')
					.setEmoji('📜')
					.setStyle('SECONDARY')
					.setCustomId('page1')
					.setDisabled(state1),
				new MessageButton()
					.setLabel('System')
					.setEmoji('⚙')
					.setStyle('SECONDARY')
					.setCustomId('page2')
					.setDisabled(state2)
			);
		}

		const em1 = client.embeds.create({
			author: `${client.user.username}'s Stats`,
			icon: client.user.displayAvatarURL(),
			description: `> ${client.user.username} is a Multipurpose Discord bot with multiple features and systems`,
			fields: [
				{
					name: 'Library & Version',
					value: `${client.utils.getEmoji(
						client,
						'discordjs'
					)} Discord.js v${version}`,
					inline: true,
				},
				{ name: 'Developers', value: 'Nickk#7480', inline: true },
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

		const em2 = client.embeds.create({
			fields: [
				{
					name: '**__System__**',
					value: `\`\`\`yml\nOS: ${process.platform} (${
						process.arch
					})\nOS Uptime: ${ms(os.uptime() * 1000, {
						compact: false,
						verbose: true,
						secondsDecimalDigits: 0,
					})}\nCPU: ${cpu.model}\nMemory Used: ${Math.round(
						process.memoryUsage().heapUsed / 1024 / 1024
					)} MB\nTotal Memory: ${Math.round(
						os.totalmem() / 1024 / 1024
					)} MB\`\`\``,
				},
			],
		});

		const m = await message.channel.send({
			embeds: [em1],
			components: [row(true, false)],
		});

		const collector = m.channel.createMessageComponentCollector({
			componentType: 'BUTTON',
			time: 120000,
		});

		collector.on('collect', async (i) => {
			if (i.user.id !== message.author.id) return;

			if (i.customId === 'page1') {
				m.edit({
					embeds: [em1],
					components: [row(true, false)],
				});
			}
			if (i.customId === 'page2') {
				m.edit({ embeds: [em2], components: [row(false, true)] });
			}

			await i.deferUpdate();
		});

		collector.on('end', async (button, i) => {
			if (i === 'time') {
				m.edit({ components: [row(true, true)] });
			}
		});
	},
});
