import { Event } from '../../structures';
import Guild from '../../lib/models/guild';

export default new Event('guildCreate', async (guild) => {
	console.log(guild.name);
	let data = await Guild.findOne({ Id: guild.id });

	if (!data) {
		data = await new Guild({ Id: guild.id }).save();
	}
});
