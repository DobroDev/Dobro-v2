import { Event } from '../../structures';
import Guild from '../../lib/models/guild';

export default new Event('guildCreate', async (guild) => {
	const data = Guild.findOne({ Id: guild.id });

	if (!data) {
		await new Guild({ Id: guild.id }).save();
	}
});
