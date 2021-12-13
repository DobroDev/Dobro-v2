import { iSlash } from '../typings/iSlash';

export class SlashCommand {
	constructor(commandOptions: iSlash) {
		Object.assign(this, commandOptions);
	}
}
