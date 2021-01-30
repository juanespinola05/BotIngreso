/* eslint-disable no-mixed-spaces-and-tabs */
const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const PrettyMS = require('pretty-ms');
const { prefix } = require('../json/config.json');

const alreadyUsed = new Set();

module.exports = {
	name: 'clases',
	aliases: [],
	description: 'Ver clases activas',
	category: 'utilidad',
	cooldown: 60000,
	format: `${prefix}clases <m/t>`,
	run: async (client, message, argumentos) => {
		if (!message.content.startsWith(prefix)) return;

		if (alreadyUsed.has(message.author.id)) {
			return message.channel
				.send('Aguanta un poco, recien preguntaste')
				.then((m) => m.delete({ timeout: 5000 }));
		}

		alreadyUsed.add(message.author.id);
		setTimeout(() => {
			alreadyUsed.delete(message.author.id);
		}, this.cooldown);

		const date = new Date(new Date().toLocaleString('en-US', { timezone: 'America/Argentina/Buenos_Aires' }));

		if([0, 6].includes(date.getDay())) {

			const msg = date.getDay() === 0 ? 'Hoy es domingo xd' : 'Hoy es sábado';
			return message.channel.send(msg);

		}

	    message.channel.startTyping();

		const conn = await client.functions.get('dbconnection').run();
		if (!conn) {
			message.channel.stopTyping();
			return message.channel.send('No connection available.');
		}

		const info = {
			day: date.getDay().toString(),
			nowMS:
                ms(`${date.getHours()}h`) +
                ms(`${date.getMinutes()}m`) +
                ms(`${date.getSeconds()}s`),
		};

		let qry = `SELECT * FROM \`clases\` WHERE fromMS <= ${info.nowMS} AND toMS > ${info.nowMS} AND \`dias\` LIKE '%${info.day}%'`;
		if (argumentos[0]) {
			if (['t', 'm'].includes(argumentos[0].toLowerCase())) {
				qry += ` AND turno = '${argumentos[0].toLowerCase()}'`;
			}
		}

		conn.query(qry, (err, rows) => {
			conn.end();
			if (err) {
				message.channel.stopTyping();
				console.error(err);
				return message.channel.send('error');
			}

			if (!rows.length) {
				message.channel.stopTyping();
				return message.channel.send('No se han encontrado clases.');
			}

			const embed = new MessageEmbed()
				.setColor('#5cd15c')
				.setAuthor('Clases activas', client.user.displayAvatarURL())
				.setTitle(`Clases activas: ${rows.length}`)
				.setTimestamp()
				.setThumbnail('https://stfainfo.ch/images/livetickerstate/live.gif')
				.setFooter('🟢 activa 🟡 culminando');

			for (let i = 0; i < rows.length; i++) {
				const horario = rows[i].horario.split('|');
				let from;
				let to;

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

				const emoji =
                    rows[i].toMS - info.nowMS <= 600000 ? '<:culminando:804416039273889882>' : '<:online:804069579579850823>';

				embed.addField(
					`${rows[i].materia.toUpperCase()} ${rows[i].tipo.toUpperCase()} ${rows[i].turno.toUpperCase()} ${rows[i].comisiones}`,
					`${emoji} [Clic para ir al link](${rows[i].link}). Contraseña: ${rows[i].password}` +
                    `\nProfesor/a ${rows[i].profesor} // ${PrettyMS(from, { colonNotation: true })}-${PrettyMS(to, { colonNotation: true })}`,
				);
			}

			message.channel.stopTyping();
			return message.channel.send(embed);
		});
	},
};
