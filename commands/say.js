/* eslint-disable no-mixed-spaces-and-tabs */
const { MessageEmbed } = require('discord.js');
const { prefix, color } = require('../json/config.json');

module.exports = {
	name: 'say',
	aliases: [],
	description: 'Enviar un mensaje a un canal',
	category: 'staff',
	cooldown: 0,
	format: `${prefix}say <canal> <msg> [-embed/-server/-timestamp/-author]`,
	run: async (client, message, argumentos) => {
		if ( !message.member.hasPermission('ADMINISTRATOR') ) {return;}

		const channel = message.mentions.channels.first();
		if (!channel) return message.channel.send('Menciona un canal');

		if (!argumentos[1]) return message.channel.send('Indica un mensaje.');

		const spliceFlag = (flag) => {
			argumentos.splice(argumentos.indexOf(flag), 1);
		};

		let embed = false;
		let everyone = false;
		const messageEmbed = new MessageEmbed().setColor(color);

		// extra flags
		if (argumentos.includes('-embed')) {
			spliceFlag('-embed');
			embed = true;
		}
		if (argumentos.includes('-server')) {
			spliceFlag('-server');
			messageEmbed.setAuthor(message.guild.name, message.guild.iconURL());
		}
		if (argumentos.includes('-author')) {
			spliceFlag('-author');
			messageEmbed.setFooter(
				message.author.tag,
				message.author.displayAvatarURL(),
			);
		}
		if (argumentos.includes('-timestamp')) {
			spliceFlag('-timestamp');
			messageEmbed.setTimestamp();
		}
		if (argumentos.includes('-everyone')) {
			spliceFlag('-everyone');
			everyone = true;
		}

		const content = await client.functions
			.get('translateCodes')
			.run(argumentos.slice(1).join(' '));

		const msg = embed ? messageEmbed.setDescription(content) : content;

		try {

			if(everyone) {
				const mensaje_enviado = embed ?
					await channel.send(channel.guild.roles.everyone, msg) :
					await channel.send(`${channel.guild.roles.everyone} ${msg}`);

				mensaje_enviado.channel.send(':white_check_mark: | Mensaje enviado!');
			}
			else { return channel.send(msg); }

		}
		catch (error) {
			console.log(error);
			return message.channel.send('Ha ocurrido un error.');
		}
	},
};
