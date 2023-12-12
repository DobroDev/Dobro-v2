import { Dobro } from '../lib/structures/Client';
import { Event } from '../lib/structures/Event';
import Reminder from '../lib/models/Reminder';
import { TextChannel } from 'discord.js';

export default new Event('ready', async (client: Dobro) => {
	client.logger.log(
		client.color.yellow(`[Handler] Loaded ${client.commands.size} commands.`)
	);
	client.logger.log(
		client.color.yellow(
			`[Handler] Loaded ${client.slashCommands.size} slashcommands.`
		)
	);
	client.logger.log(
		client.color.yellow(`[Handler] Loaded ${client.contextMenus.size} menus.`)
	);

	client.logger.log(client.color.green(`[Bot] ${client.user.tag} is online!`));

	setInterval(async () => {
		await reminders();
	}, 10000);

	async function reminders() {
		const query = { expires: { $lt: new Date() } };

		const reminders = await Reminder.find(query);

		for (const r of reminders) {
			const { guildId, channelId, userId, reason, time } = r;
			const g = await client.guilds.fetch(guildId);
			if (!g) continue;
			const ch = g.channels.cache.get(channelId) as TextChannel;
			if (!ch) continue;
			const m = g.members.cache.get(userId);
			if (!m) continue;

			const reminder = client.embeds.create({
				title: `${client.utils.getEmoji(client, 'clockthing')} Reminder`,
				description: reason
					? `**Hey! Don't forget to:** ${reason}`
					: `**It has been ${time}.**`,
				color: 'RANDOM',
			});

			if (ch && m) ch.send({ content: `<@${m.id}>`, embeds: [reminder] });
			m.user.send({ embeds: [reminder] }).catch(() => {});
		}
		await Reminder.deleteMany(query);
	}
});
