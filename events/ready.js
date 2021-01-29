// const { Collection } = require('discord.js');
// const { logs_id, alerts } = require('../json/config.json');

module.exports = {
	name: 'ready',
	run: async (client) => {
		console.info('I\'m online!');
		client.user.setPresence({
			status: 'online',
			activity: {
				name: 'mover derecha mover',
				type: 'PLAYING',
			},
		});
	},
};
