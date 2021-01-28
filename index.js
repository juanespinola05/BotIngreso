const { Client, Collection } = require('discord.js');
const client = new Client({partials: ["REACTION","MESSAGE","CHANNEL"]});
const config = require('./json/config.json');
const { readdirSync } = require('fs');

let module_categories = ["commands","events","functions"];

for(category of module_categories) {

    client[category] = new Collection();
    var files = readdirSync(`./${category}`).filter(f => f.endsWith('.js'));
    
    for(file of files) {
        let module = require(`./${category}/${file}`);
        client[category].set(module.name, module);
        console.info(`[${category}] ${file} correctly loaded.`);
    }

}

//Client listeners

client.on("ready", () => {
    client.events.get("ready").run(client);
});

client.on("message", (message) => {
    client.events.get("message").run(client, message);
});
/*
client.on("messageReactionAdd", (reaction, user) => {
    client.events.get("messageReactionAdd").run(client, reaction, user);
});

client.on("guildMemberRemove", (member) => {
    client.events.get("guildMemberRemove").run(client, member);
});*/

client.login(config.token);