/* eslint-disable no-mixed-spaces-and-tabs */
const { prefix } = require('../json/config.json');
// const { MessageEmbed } = require('discord.js');
const alreadyUsed = new Set();
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'wp',
	aliases: ['comisiones'],
	description: 'Ver clases activas',
	category: 'utilidad',
	cooldown: 60000,
	format: `${prefix}whatsapp <m/t>`,
	run: async (client, message, argumentos) => {
		if (alreadyUsed.has(message.author.id)) {
			return message.channel
				.send('Aguanta un poco, recien preguntaste')
				.then((m) => m.delete({ timeout: 3000 }));
		}

		alreadyUsed.add(message.author.id);
		setTimeout(() => {
			alreadyUsed.delete(message.author.id);
		}, this.cooldown);

		message.channel.startTyping();

		const conn = await client.functions.get('dbconnection').run();

		if (!conn) {
			message.channel.stopTyping();
			return message.channel.send('No connection available.');
		}
		const qry = `SELECT * FROM whatsapp WHERE \`group\`='${argumentos[0]}'`;

		if (!argumentos[0]) {
			return message.channel.send(
				'No hay argumento. ej. de formato: -wp M1 -wp t1',
			);
		}

		conn.query(qry, (err, rows) => {
			conn.end();
			if (rows.length === 0) {
				message.channel.stopTyping();
				return message.channel.send(
					'No hay argumento. ej. de formato: -wp M1 -wp t1',
				);
			}
			const [{ group, url }] = rows;
			if (err) {
				message.channel.stopTyping();
				console.error(err);
				return message.channel.send('error');
			}
			message.channel.stopTyping();

			const embed = new MessageEmbed()
				.setColor('#f00000')
				.setTitle(`Comisión ${group}`)
				.setDescription(`Grupo de WhatsApp de la comisión ${group}`)
				.setTimestamp()
				.setThumbnail(
					'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s180-rw',
				)
				.addField(` Link:${url}`);
			message.channel.send(embed);
		});
	},
};
