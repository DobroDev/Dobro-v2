import { Dobro } from '../lib/structures/Client';
import { Event } from '../lib/structures/Event';

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
});
