// const { Collection } = require('discord.js');
// const { logs_id, alerts } = require('../json/config.json');
const { readdirSync } = require('fs');

module.exports = {
	name: 'ready',
	run: async (client) => {

		console.info('I\'m online!');

		// logs channel
		client.log = require('../helpers/log');

		// Presence interval
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

		// Index new audio files in /audio
		const indexedAudios = require('../json/audio.json');
		const audioFiles = readdirSync('../audio').filter( f => f.endsWith('mp3') || f.endsWith('ogg'));

		if(indexedAudios.length === audioFiles.length) return;
		else {
			const audioIterator = require('../helpers/audioIterator');
			audioIterator();
			return;
		}
	},
};
