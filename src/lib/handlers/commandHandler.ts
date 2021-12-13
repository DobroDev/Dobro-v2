import { Dobro } from '../structures/Client';
import glob from 'glob';
import { promisify } from 'util';
import { iCommand } from '../typings/iCommand';
const globP = promisify(glob);

export default async (client: Dobro) => {
	const cmdFiles = await globP(`${__dirname}/../../commands/*/*{.ts,.js}`);
	cmdFiles.forEach(async (filePath) => {
		const cmd: iCommand = await client.utils.importFile(filePath);
		if (!cmd.name) return;

		if (cmd.aliases) {
			cmd.aliases.forEach((alias) => {
				client.aliases.set(alias, cmd.name);
			});
		}

		client.commands.set(cmd.name, cmd);
	});
};
