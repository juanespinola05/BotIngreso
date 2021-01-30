const { prefix } = require('./../json/config.json');
const { chart } = require('./crypto/cryptoChart');
const { btcMsgCurrent } = require('./crypto/cryptoCurrent');
module.exports = {
	name: 'btc',
	aliases: ['bpi'],
	description: 'Muestra el bpi actual, gráfico 31 days',
	cooldown: 100,
	category: 'statistics',
	format: `${prefix}bpi <m/t>`,
	run: async (client, message, argumentos) => {
		if (!argumentos[0]) {
			return message.channel.send('comando sin especificar');
		}
		message.channel.startTyping();
		console.log(argumentos, 'holis');
		switch (argumentos[0]) {
		case 'usd':
			btcMsgCurrent(message, 'USD');
			break;
		case 'ars':
			btcMsgCurrent(message, 'ARS');
			break;
		case 'chars':
			chart(message, 'ARS');
			break;
		case 'chusd':
			chart(message, 'USD');
			break;
		case 'custom':
			chart(message, argumentos[1]);
			break;
		default:
			return message.channel.send('comando sin especificar');
		}
		message.channel.stopTyping();
	},
};
