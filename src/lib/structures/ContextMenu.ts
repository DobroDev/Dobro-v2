import { iContext } from '../typings/iContext';

export class ContextMenu {
	constructor(commandOption: iContext) {
		Object.assign(this, commandOption);
	}
}
