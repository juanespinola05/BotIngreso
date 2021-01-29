/* eslint-disable no-mixed-spaces-and-tabs */
const { prefix } = require('../json/config.json');
const audio = require('../json/audio.json');
module.exports = {
	name: 'playaudio',
	aliases: ['pa'],
	description: 'Reproduce un audio',
	cooldown: '5s',
	category: 'juegos',
	formato: prefix + 'playsound',
	run: async (client, message, argumentos) => {
		if (
			!message.content.startsWith(prefix) ||
      		!message.member.hasPermission('ADMINISTRATOR')
		) {
			return;
		}
		// si ya está conectado el bot
		const guildConnection = client.voice.connections.find(
			(c) => c.channel.guild.id === message.guild.id,
		);
		if (guildConnection) return;

		if (!argumentos[0]) {
			return message.channel.send(
				`\`\`\`Ingresa un audio aca tenes una lista:\n${Object.keys(audio)
					.map((x) => `- ${x}`)
					.join('\n')}\`\`\``,
			);
		}

		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) {
			return message.channel.send(
				'Debes estar conectado a un canal de voz para ejecutar este comando.',
			);
		}

		if (!audio[argumentos[0]]) {
			return message.channel.send('Ese audio no existe.');
		}
		voiceChannel
			.join()
			.then((connection) => {
				const dispatcher = connection.play(
					`./audio/${audio[argumentos[0]].url}`,
					{ volume: 1 },
				);
				dispatcher.on('finish', () => {
					voiceChannel.leave();
				});
			})
			.catch((err) => {
				if (err) console.log(err);
			});
	},
};
