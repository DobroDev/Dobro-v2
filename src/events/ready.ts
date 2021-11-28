import { Event } from '../structures';
import { Dobro } from '../lib/client/Dobro';

export default new Event('ready', (client: Dobro) => {
	client.consola.log(client.chalk.green(`[Bot] ${client.user.tag} is Online!`));
});
