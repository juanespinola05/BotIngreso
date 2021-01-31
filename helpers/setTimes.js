/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const { prefix } = require('../json/config.json');
const ms = require('ms');
const PrettyMS = require('pretty-ms');

module.exports = {
	name: 'settimes',
	aliases: [],
	description: 'prueba',
	category: 'staff',
	cooldown: 0,
	format: `${prefix}test`,
	run: async (client, message, argumentos) => {
		if ( !message.member.hasPermission('ADMINISTRATOR') ) return;
		if (message.author.id != '338104072634761216') return;

		const conn = await client.functions.get('dbconnection').run();
		if (!conn) return message.channel.send('No connection available.');

		const qry = 'SELECT * FROM `clases` WHERE fromMS = 0';

		conn.query(qry, (err, rows, fields) => {
			if (err) {
				conn.end();
				console.error(err);
				return message.channel.send('error');
			}

			if (rows) {
				for (let i = 0; i < rows.length; i++) {
					let from, to;

					const horario = rows[i].horario.split('|');

					if (horario[0].includes('.')) {
						const primer_horario = horario[0].split('.');
						from = ms(primer_horario[0]) + ms(primer_horario[1]);
					}
					else {
						from = ms(horario[0]);
					}

					if (horario[1].includes('.')) {
						const seg_horario = horario[1].split('.');
						to = ms(seg_horario[0]) + ms(seg_horario[1]);
					}
					else {
						to = ms(horario[1]);
					}

					const qryClases = `UPDATE \`clases\` SET fromMS = "${from}", toMS = "${to}" WHERE link = "${rows[i].link}"`;

					conn.query(qryClases, (err, results) => {
						if (err) {
							conn.end();
							return console.error(err);
						}
						else {
							console.info(`${rows[0].tipo} cambiado: ${from}-${to}`);
						}
					});
				}
			}
			else {
				return message.channel.send('asd');
			}
		});
	},
};
