import { Event } from '../../structures';
import infractions from '../../lib/models/infractions';
import Guild from '../../lib/models/guild';
import { Dobro } from '../../lib/client/Dobro';

export default new Event('ready', async (client: Dobro) => {
	const check = async () => {
		const dbQuery = {
			expires: { $lt: new Date() },
			active: true,
		};

		const punishments = await infractions.find(dbQuery);

		for (const p of punishments) {
			const { guildId, infractionId, userId, type } = p;

			const guild = await client.guilds.fetch(guildId);
			if (!guild) continue;

			if (type === 'mute') {
				const data = await Guild.findOne({ Id: guild.id });

				const muteRole = await guild.roles
					.fetch(data.muteRole)
					.catch((e: any) => {});
				if (!muteRole) continue;

				const member = guild.members.cache.get(userId);
				if (!member) continue;

				member.roles.remove(muteRole, `[Automatic] Mute expired`).catch((err: any) => {});
				member.user
					.send({
						embeds: [
							client.utils.Embed({
								description: `You were unmuted in ${guild.name} | Reason: [Automatic] Mute expired.`,
								color: 'GREEN',
								footer: `ID: ${infractionId}`,
							}),
						],
					})
					.catch((err: any) => {});
			}
		}
		await infractions.updateMany(dbQuery, { active: false });

		setTimeout(check, 60000);
	};

	check();
});
