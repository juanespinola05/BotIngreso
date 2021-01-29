const { prefix } = require('../json/config.json');

module.exports = {
	name: 'eval',
	aliases: ['asd', 'asdasdasd'],
	description: 'Ejecutar código',
	category: 'staff',
	cooldown: 60000,
	format: `${prefix}eval`,
	run: async (client, message) => {
		if (!message.content.startsWith(prefix)) return;
	},
};
