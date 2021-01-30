const { MessageEmbed } = require('discord.js');
const { getBtc } = require('../../api/dataMap');


const btcMsgCurrent = async (message, coin = 'USD') => {
	const data = await getBtc(coin);
	const embed = new MessageEmbed()
		.setColor('#f00000')
		.setTitle(`${data.code}-BTC`)
		.setDescription(data.description)
		.setTimestamp()
		.addField('Rate', `1BTC = ${data.rate}$ ${data.code}`)
		.setThumbnail(
			'https://static.cryptomkt.com/static/landing/img/btc-box-promo.png',
		);
	message.channel.send(embed);
};

module.exports = {
	btcMsgCurrent,
};
