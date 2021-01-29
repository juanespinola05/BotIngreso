const { prefix } = require('../json/config.json');
const path = require('path');
module.exports = {
	name: 'playaudio',
	aliases: [],
	description: 'play audio',
	category: 'staff',
	cooldown: 0,
	format: `${prefix}eval`,
	run: async (client, message) => {
		const { voice } = message.member;
		if (!voice.channelID) {
			message.reply('Debes de estar en un canal de voz');
			return;
		}
		voice.channel.join().then((connection) => {
			connection.play(path.join(__dirname + './../misc/yooo.mp3'));
		});
	},
};
