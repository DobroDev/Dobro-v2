const { Client } = require('discord.js');
const db = require('mongoose');
const AsciiTable = require('ascii-table');
const Table = new AsciiTable();

module.exports = {
	name: 'ready',
	once: true,
	/**
	 *
	 * @param {Client} client
	 */
	run: async (client) => {
		console.log('\n');

		Table.addRow(`${client.user.tag} is online!`);

		if (!client.config.Database.URL) return;
		await db
			.connect(client.config.Database.URL, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log('Connected to Database 💻'.green);
			})
			.catch((e) => {
				console.log(e);
			});

		console.log(Table.toString().cyan);
	},
};
