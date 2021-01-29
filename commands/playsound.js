const { prefix } = require('../json/config.json');
const audio = require('../audio/audio.json');
module.exports = {
	name: 'playaudio',
	aliases: ['pa'],
	description: 'Reproduce un audio',
	cooldown: '5s',
	category: 'juegos',
	formato : prefix + 'playsound',
	run: async (client, message, argumentos) => {

		if(!message.content.startsWith(prefix) || !message.member.hasPermission('ADMINISTRATOR')) return;
		// si ya está conectado el bot
		const guildConnection = client.voice.connections.find(c => c.channel.guild.id === message.guild.id);
		if(guildConnection) return;

		const voiceChannel = message.member.voice.channel;
		if(!voiceChannel) return message.channel.send('Debes estar conectado a un canal de voz para ejecutar este comando.');
		if(argumentos[0] && (argumentos[0] === 'help')) return message.channel.send();

		if(!audio[argumentos[0]]) return message.channel.send('Ese audio no existe.');
		voiceChannel.join().then(connection => {
			const dispatcher = connection.play(`./audio/${audio[argumentos[0]]}`, { volume: 1 });
			dispatcher.on('finish', () => {
				voiceChannel.leave();
			});
		}).catch(err => {
			if(err) console.log(err);
		});
	},
};