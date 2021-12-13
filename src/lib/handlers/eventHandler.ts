import { Dobro } from '../structures/Client';
import glob from 'glob';
import { promisify } from 'util';
import { Event } from '../structures/Event';
import { ClientEvents } from 'discord.js';
const globP = promisify(glob);

export default async (client: Dobro) => {
	const eventFiles = await globP(`${__dirname}/../../events/*{.ts,.js}`);
	eventFiles.forEach(async (filePath) => {
		const event: Event<keyof ClientEvents> = await client.utils.importFile(
			filePath
		);
		if (event.once) {
			client.once(event.event, event.run);
		} else {
			client.on(event.event, event.run);
		}
	});

	client.logger.log(
		client.color.yellow(`[Handler] Loaded ${eventFiles.length} events.`)
	);
};
