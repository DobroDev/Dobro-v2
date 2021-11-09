import { Event } from '../utils/structures';

export default new Event('ready', () => {
	console.log('Online!');
});
