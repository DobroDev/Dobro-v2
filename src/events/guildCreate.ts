import Guild from '../lib/models/Guild';
import { Event } from '../lib/structures/Event';

export default new Event('guildCreate', async (guild) => {
	const data = Guild.findOne({
		Id: guild.id,
	});

	if (!data) {
		await Guild.create({
			Id: guild.id,
		});
	}
});
