import { Dobro } from '../lib/client/Dobro';
import { Event } from '../structures';
import { ClientEvents } from 'discord.js';
import glob from 'glob';
import { promisify } from 'util';
const globP = promisify(glob);

export default async (client: Dobro) => {
	const eventFiles = await globP(`${__dirname}/../events/*{.ts,.js}`);
	eventFiles.forEach(async (file) => {
		const event: Event<keyof ClientEvents> = await client.utils.importFile(
			file
		);
		client.on(event.event, event.run);
	});
};
