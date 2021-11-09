import { Dobro } from '../utils/client/Dobro';
import { ApplicationCommandDataResolvable } from 'discord.js';
import { iSlash } from '../utils/structures';
import glob from 'glob';
import { promisify } from 'util';
const globP = promisify(glob);

export default async (client: Dobro) => {
	const slashArray: ApplicationCommandDataResolvable[] = [];
	const devArray: ApplicationCommandDataResolvable[] = [];

	const slashFiles = await globP(`${__dirname}/../slashCommands/*/*{.ts,.js}`);
	slashFiles.forEach(async (file) => {
		const slash: iSlash = await client.utils.importFile(file);
		if (!slash.name) return;

		if (slash.Development) {
			client.slashCommands.set(slash.name, slash);
			devArray.push(slash);
		}
		client.slashCommands.set(slash.name, slash);
		slashArray.push(slash);
	});

	client.on('ready', async () => {
		const { DevServer } = client.config.Bot;

		await client.utils.registerSlash({
			client: client,
			guildID: DevServer,
			devcommands: devArray,
			appcommands: slashArray,
		});
	});
};
