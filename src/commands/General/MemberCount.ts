import { Command } from '../../lib/structures/Command';

export default new Command({
	name: 'membercount',
	description: 'Displays the server member count.',
	aliases: ['members'],
	usage: 'membercount',
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message }) => {
		client.utils.inlineReply(message, {
			embed: client.embeds.create({
				fields: [{ name: 'Members', value: `${message.guild.memberCount}` }],
				timestamp: true,
			}),
		});
	},
});
