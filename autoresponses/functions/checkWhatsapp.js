// const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../json/config.json');

const checkWhatsapp = (client, message) => {

	return new Promise( async (res, rej) => {
		// Regular expression 
		const regEx = /((grupo|whatsapp|wsp|wp) (de )?(m|t)[0-9]{1,2})|(^(m|t)[0-9]{1,2}\?)|((grupo|whatsapp|wsp|wp) (de )?(la|mi) comisi(ó|o)n ?((m|t)[0-9]{1,2})?)/gmi;

		if(regEx.test(message.content)) {

			//check whether an user has a commission role

			let comision = message.member.roles.cache
				.find(r => /(t|m)[0-9]{1,2}/gmi.test(r.name));
			let msgCommand = `${message.author.toString()}, usa **${prefix}wsp <tu-comisión>** para obtener el link.`;

			if(comision) {
				comision = comision.name.toLowerCase();
			}
			else {
				res(msgCommand);
			}

			const conn = await client.functions.get("dbconnection").run();

			if(!conn) res(msgCommand);
			
			const commissionInMessage = message.content.split(" ").find(e => /(m|t)[0-9]{1,2}/gmi.test(e));
			
			let qryWhatsappGroup;
			// Define query
			// ex: "m3?","t10?"
			if(comision.toLowerCase() === message.content.toLowerCase()+"?") 
				qryWhatsappGroup = `SELECT * FROM \`whatsapp\` WHERE \`group\` = '${comision}'`;
			// commission given in message
			else if(commissionInMessage !== comision && commissionInMessage !== undefined)
				qryWhatsappGroup = `SELECT * FROM \`whatsapp\` WHERE \`group\` = '${commissionInMessage.replace(/\?/gmi,'')}'` ;
			// commission acording to user's roles (M1, M2, T1, etc.)
			else 
				qryWhatsappGroup = `SELECT * FROM \`whatsapp\` WHERE \`group\` = '${comision}'`

			conn.query(qryWhatsappGroup, (err, rows, fields) => {
				conn.end();
				if(err) {
					console.error(err);
					
					client.log(client, {
						content: `Ha ocurrido un error (#${Date.now()})`,
						title: "Error",
						error: err
					});
				
					rej(false);
				}

				if(!rows.length) return res(msgCommand);

				const msgInvitation = new MessageEmbed()
					.setColor('#f00000')
					.setTitle(`Comisión ${rows[0].group}`)
					.setDescription(`Grupo de WhatsApp de la comisión ${rows[0].group}`)
					.setTimestamp()
					.setThumbnail(
						'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s180-rw',
					)
					.addField('Link:', rows[0].url);

				res({ content: message.author.toString(), embed: msgInvitation});
			});

		}
	});

};

module.exports = checkWhatsapp;