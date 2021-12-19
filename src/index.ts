import { Dobro } from './lib/structures/Client';

export const client = new Dobro();

client.init();

process.on('unhandledRejection', (reason, p) => {
	client.logger.error(reason);
});
