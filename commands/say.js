const { MessageEmbed } = require('discord.js');
const { prefix, color } = require('../json/config.json');

module.exports = {
    name: "say",
    aliases: [],
    description: "Send message to stated channel as bot",
    category: "staff",
    cooldown: 0,
    format: `${prefix}say <channel> <msg> [-embed/-server/-timestamp/-author]`,
    run: async (client, message, argumentos) => {
        if(!message.content.startsWith(prefix) || !message.member.hasPermission("ADMINISTRATOR")) return;
        
        var channel = message.mentions.channels.first();
        if(!channel) return message.channel.send("Pin a channel");

        if(!argumentos[1]) return message.channel.send("Provide a message.");

        var spliceFlag = (flag) => {
            argumentos.splice( argumentos.indexOf(flag), 1);
        }

        var embed = false;
        var messageEmbed = new MessageEmbed()
            .setColor(color);
        
        //extra flags
        if(argumentos.includes("-embed")) {
            spliceFlag("-embed");
            embed = true;
        }
        if(argumentos.includes("-server")) {
            spliceFlag("-server");
            messageEmbed.setAuthor(message.guild.name, message.guild.iconURL());
        }
        if(argumentos.includes("-author")) {
            spliceFlag("-author");
            messageEmbed.setFooter(message.author.tag, message.author.displayAvatarURL());
        }
        if(argumentos.includes("-timestamp")) {
            spliceFlag("-timestamp");
            messageEmbed.setTimestamp();
        }

        var content = await client.functions.get("translateCodes").run(argumentos.slice(1).join(" "));

        var msg = embed ? messageEmbed.setDescription(content) : content;

        try {

            message.channel.send(":white_check_mark: | Message sent!");
            return channel.send(msg);

        } catch (error) {
            console.log(error);
            return message.channel.send("An error ocurred while trying to send the message.");
        }
    }
}