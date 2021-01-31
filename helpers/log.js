const { MessageEmbed } = require('discord.js');
const { logs_channel_id, color } = require('../json/config.json');

const log = (client, message) => {

	const logs_channel = client.channels.cache.get(logs_channel_id);

	if(logs_channel) {

		const embed = new MessageEmbed()
			.setColor(color)
			.setDescription(message.content)
			.setTimestamp()
			.setFooter(message.title);

		return logs_channel.send(embed);

	}
	else {
        console.log(`Couldn't log message into logs channel: '${message.content}'`);
	}

};

module.exports = log;