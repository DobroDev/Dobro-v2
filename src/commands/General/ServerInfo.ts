import { Command } from '../../lib/structures/Command';

export default new Command({
	name: 'serverinfo',
	description: 'Displays information about the server.',
	aliases: ['guildinfo', 'sinfo'],
	usage: 'serverinfo',
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message }) => {
		const { guild } = message;
		const { roles } = guild;

		const unknownIcon =
			'https://external-preview.redd.it/9HZBYcvaOEnh4tOp5EqgcCr_vKH7cjFJwkvw-45Dfjs.png?auto=webp&s=ade9b43592942905a45d04dbc5065badb5aa3483';

		const categories = guild.channels.cache.filter(
			(ch) => ch.type === 'GUILD_CATEGORY'
		).size;
		const text = guild.channels.cache.filter(
			(ch) => ch.type === 'GUILD_TEXT'
		).size;
		const voice = guild.channels.cache.filter(
			(ch) => ch.type === 'GUILD_VOICE'
		).size;
		const users = guild.members.cache.filter((m) => !m.user.bot).size;
		const bots = guild.members.cache.filter((m) => m.user.bot).size;

		const AllRoles =
			roles.cache.size < 25
				? roles.cache.map((r) => `${r}`).join(' ')
				: roles.cache
						.map((r) => `${r}`)
						.slice(0, 25)
						.join(' ') + ' and more...';

		await client.inlineReply(message, {
			embed: client.embeds.create({
				author: guild.name,
				icon: guild.iconURL() || unknownIcon,
				thumbnail: guild.iconURL({ dynamic: true }) || unknownIcon,
				fields: [
					{
						name: 'Owner',
						value: (await guild.fetchOwner()).user.tag,
						inline: true,
					},
					{
						name: `Members - [${guild.memberCount}]`,
						value: `${users} Humans, ${bots} Bots`,
						inline: true,
					},
					{
						name: 'Boosts',
						value: `${
							guild.premiumSubscriptionCount
						} (Tier ${client.utils.formatPerm(guild.premiumTier)})`,
						inline: true,
					},
					{
						name: 'Channels',
						value: `${categories} Categories, ${text} Text, ${voice} Voice`,
						inline: true,
					},
					{
						name: `Roles - [${roles.cache.size}]`,
						value: AllRoles,
					},
					{
						name: 'Creation Date',
						value: `<t:${Math.floor(
							guild.createdTimestamp / 1000
						)}:f> (<t:${Math.floor(guild.createdTimestamp / 1000)}:R>)`,
					},
				],
				footer: `ID: ${guild.id}`,
				timestamp: true,
				color: 'RANDOM',
			}),
		});
	},
});
