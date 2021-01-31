// const Discord = require('discord.js');

const checkWhatsapp = require("./functions/checkWhatsapp");

const checkAutoresponses = async (client, message) => {

	//Check whatsapp
	const msg = await checkWhatsapp(client, message);
	if(msg) return message.channel.send(msg);

	//check horarios

	//check no se xd

};

module.exports = checkAutoresponses;