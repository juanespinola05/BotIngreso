const { prefix } = require('../json/config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'eval',
	aliases: [],
	description: 'Ejecutar código',
	category: 'staff',
	cooldown: 0,
	format: `${prefix}eval`,
	run: async (client, message, argumentos) => {
		if ( !['259536076211748887', '338104072634761216'].includes(message.author.id) ) return;

		const clean = (text) => {
			if (typeof text === 'string') {
				return text
					.replace(/`/g, '`' + String.fromCharCode(8203))
					.replace(/@/g, '@' + String.fromCharCode(8203));
			}
			else {
				return text;
			}
		};

		try {
			const code = argumentos.join(' ');
			let evaled = eval(code);

			if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

			message.channel.send(clean(evaled), { code: 'xl' }).catch((err) => {
				console.log(err);
				return message.channel.send(':x: | Error al enviar la respuesta.');
			});
		}
		catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	},
};
