const { prefix } = require('../json/config.json');
const checkAutoresponses = require('../autoresponses/checkAutoReponses');

module.exports = {
	name: 'message',
	run: async (client, message) => {
		if (!message.guild || message.author.bot) return;
		const argumentos = message.content.slice(prefix.length).trim().split(/ +/g);
		const cmd = argumentos.shift().toLowerCase();
		const command = client.commands.get(cmd) || client.commands.find((c) => c.aliases.includes(cmd));

		if (command) {
			if (!message.content.startsWith(prefix)) return;
			command.run(client, message, argumentos);
		}
		else {
			checkAutoresponses(client, message);
		}
	},
};
