/**
 * @author Elias Tilegant
 * @version 0.0.1 2021
 */

//Init requirements
const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { token} = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//Getting commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.buttons = new Collection();
const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));

//const command = client.commands.get(interaction.commandName);

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    //Set new item in collection
    client.commands.set(command.data.name, command);
}


for (const file of buttonFiles) {
    const button = require(`./buttons/${file}`);
    //Sez new button in collection
    client.buttons.set(button.customId, button);
}

//Init event files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    if (event.once){
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

//Alt code
/*var intervalLink = setInterval(getLink, 1000 * 60 * 60 * 24);
var intervalMF = setInterval(getMF, 1000 * 60 * 10);*/

client.login(token);