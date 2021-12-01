import { Dobro } from '../lib/client/Dobro';

export default (client: Dobro) => {
	process.on('unhandledRejection', (reason, p) => {
		client.consola.error(reason);
	});
};
