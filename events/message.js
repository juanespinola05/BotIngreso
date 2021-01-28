const { prefix } = require("../json/config.json");

module.exports = {
    name: "message",
    run: async(client, message) => {
        if(!message.guild || message.author.bot) return;


        const argumentos = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = argumentos.shift().toLowerCase();
        var command = client.commands.get(cmd) || client.commands.find((c) => c.aliases.includes(cmd));

        if(command) {
            command.run(client, message, argumentos);
        }
    }
}