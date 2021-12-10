import { Event } from '../../structures';
import infractions from '../../lib/models/infractions';
import Guild from '../../lib/models/guild';

export default new Event('guildMemberAdd', async (member) => {
	const { guild } = member;

	const check = await infractions.findOne({
		guildId: guild.id,
		userId: member.id,
		type: 'mute',
		active: true,
	});

	const data = await Guild.findOne({ Id: guild.id });

	const muteRole = await guild.roles.fetch(data.muteRole);

	if (check && muteRole) {
		member.roles.add(muteRole);
	}
});
