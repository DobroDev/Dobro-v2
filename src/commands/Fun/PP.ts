import { Command } from '../../lib/structures/Command';

export default new Command({
	name: 'pp',
	description: 'Check how big your pp actually is.',
	aliases: ['dick', 'penis'],
	usage: 'pp [user]',
	examples: ['pp @Nickk', 'pp 775265751954096138'],
	userPerms: ['SEND_MESSAGES'],
	run: async ({ client, message, args }) => {
		const { user } = await client.utils.ArgsMember(message, args, true);

		const pp = makePP(Math.floor(Math.random() * 10) + 1 - 1 + 1);

		await client.inlineReply(message, {
			embed: client.embeds.create({
				title: '`PP Size Machine`',
				description: `${user.username}'s penis\n8${pp}D`,
			}),
		});
	},
});

function makePP(length: number) {
	let result = '';
	const characters = '===============';
	const chL = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * chL));
	}
	return result;
}
