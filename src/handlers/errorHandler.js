const { Client } = require('../modules/Utils');

/**
 * @param {Client} client
 */
module.exports = (client) => {
	process.on('unhandledRejection', (reason, p) => {
		client.consola.error(new Error(reason, p));
	});

	process.on('uncaughtException', (err, origin) => {
		client.consola.error(new Error(err, origin));
	});

	process.on('uncaughtExceptionMonitor', (err, origin) => {
		client.consola.error(new Error(err, origin));
	});

	process.on('multipleResolves', (type, promise, reason) => {
		client.consola.error(new Error(type, promise, reason));
	});
};
