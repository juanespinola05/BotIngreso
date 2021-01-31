// const { Collection } = require('discord.js');
// const { logs_id, alerts } = require('../json/config.json');

module.exports = {
	name: 'ready',
	run: async (client) => {

		console.info('I\'m online!');

		client.log = require('../helpers/log');

		const statuses = ['mover', 'derecha', 0];

		setInterval(() => {

			let nextStatus;

			if (statuses[2]) {
				nextStatus = statuses[0];
				statuses[2] = 0;
			}
			else {
				nextStatus = statuses[1];
				statuses[2] = 1;
			}

			client.user.setPresence({
				status: 'online',
				activity: {
					name: nextStatus,
					type: 'PLAYING',
				},
			});

		}, 3000);

	},
};
