import { Dobro } from '../lib/client/Dobro';
import { ApplicationCommandDataResolvable } from 'discord.js';
import { iContext, iSlash } from '../structures';
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
		if (!slash.description) return;

		if (slash.Development) {
			client.slashCommands.set(slash.name, slash);
			devArray.push(slash);
		}
		client.slashCommands.set(slash.name, slash);
		slashArray.push(slash);
	});

	const contextFiles = await globP(
		`${__dirname}/../slashCommands/Context/*{.ts,.js}`
	);
	contextFiles.forEach(async (file) => {
		const context: iContext = await client.utils.importFile(file);
		if (!context.name) return;

		if (context.Guild) {
			client.contextMenus.set(context.name, context);
			devArray.push(context);
		}
		client.contextMenus.set(context.name, context);
		slashArray.push(context);
	});

	client.consola.log(`[Handler] Loaded ${slashArray.length} commands/menus.`);

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
