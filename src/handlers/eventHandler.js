const { eventNames } = require('../modules/eventNames');
const { glob } = require('glob');
const { promisify } = require('util');
const PGlob = promisify(glob);
const Table = require('ascii-table');
const Utils = require('../modules/Utils');
const { Client, disabledEvents } = Utils;

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
	const Load = new Table('📅 Events');

	(await PGlob(`${process.cwd()}/src/Events/**/*.js`)).map(async (file) => {
		if (disabledEvents.length > 0 && file.includes(disabledEvents)) return;

		const event = require(file);
		const split = file.split('/');
		const directory = split[split.length - 2];
		const filename = split[split.length - 1];

		if (!eventNames.includes(event.name) || !event.name) {
			Load.addRow(
				`${event.name || 'Missing'}`,
				`❌ Invalid: ${directory + '/' + filename}`
			);
			return;
		}

		if (event.once) {
			client.once(event.name, (...args) => event.run(client, ...args));
		} else {
			client.on(event.name, (...args) => event.run(client, ...args));
		}

		Load.addRow(event.name, '✔️');
	});

	console.log('\n');
	console.log(Load.toString().blue);
};
