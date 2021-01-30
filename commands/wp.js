/* eslint-disable no-mixed-spaces-and-tabs */
const { prefix } = require('../json/config.json');
// const { MessageEmbed } = require('discord.js');
const alreadyUsed = new Set();

module.exports = {
	name: 'wp',
	aliases: ['comisiones', 'whatsapp', 'wsp'],
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

		if (!argumentos[0]) return message.channel.send('No hay argumento. ej. de formato: -wp M1 -wp T1');

		conn.query(qry, (err, rows) => {
			conn.end();

			if (rows.length === 0) {
				message.channel.stopTyping();
				return message.channel.send('No existe esa comisión, el formato es: -wp M1');
			}

			const [{ group, url }] = rows;

			if (err) {
				message.channel.stopTyping();
				console.error(err);
				return message.channel.send('error');
			}

			const msg = `Comision ${group} Link:${url}`;

			message.channel.stopTyping();
			return message.channel.send(msg);
		});
	},
};
