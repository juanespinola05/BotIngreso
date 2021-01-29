const { prefix } = require('../json/config.json');

module.exports = {
	name: 'message',
	run: async (client, message) => {
		if (!message.guild || message.author.bot) return;
		let argumentos = message.content.slice(prefix.length).trim().split(/ +/g);
		let cmd = argumentos.shift().toLowerCase();
		let command =
      client.commands.get(cmd) ||
      client.commands.find((c) => c.aliases.includes(cmd));

		argumentos = message.content.slice(prefix.length).trim().split(/ +/g);
		cmd = argumentos.shift().toLowerCase();
		command =
      client.commands.get(cmd) ||
      client.commands.find((c) => c.aliases.includes(cmd));

		if (command) {
			command.run(client, message, argumentos);
		}
	},
};
