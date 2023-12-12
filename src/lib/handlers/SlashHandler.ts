import { ApplicationCommandDataResolvable } from 'discord.js';
import { Dobro } from '../structures/Client';
import glob from 'glob';
import { promisify } from 'util';
import { iSlash } from '../typings/iSlash';
import { iContext } from '../typings/iContext';
const globP = promisify(glob);

export default async (client: Dobro) => {
	const globalCommands: ApplicationCommandDataResolvable[] = [];
	const devCommands: ApplicationCommandDataResolvable[] = [];

	const slashFiles = await globP(
		`${__dirname}/../../slashCommands/*/*{.ts,.js}`
	);
	slashFiles.forEach(async (filePath) => {
		const slash: iSlash = await client.utils.importFile(filePath);
		if (!slash.name || !slash.description) return;

		if (slash.inDevelopment) {
			client.slashCommands.set(slash.name, slash);
			devCommands.push(slash);
		}
		client.slashCommands.set(slash.name, slash);
		globalCommands.push(slash);
	});

	const contextFiles = await globP(
		`${__dirname}/../../contextMenus/*{.ts,.js}`
	);
	contextFiles.forEach(async (filePath) => {
		const menu: iContext = await client.utils.importFile(filePath);
		if (!menu.name || !menu.type) return;

		if (menu.inDevelopment) {
			client.contextMenus.set(menu.name, menu);
			devCommands.push(menu);
		}
		client.contextMenus.set(menu.name, menu);
		globalCommands.push(menu);
	});

	client.on('ready', async (client: Dobro) => {
		await client.utils.registerCommands({
			client: client,
			guildID: client.config.devServer,
			reset: client.config.resetCmds,
			dev: devCommands,
			global: client.config.dev ? [] : globalCommands,
		});
	});
};
