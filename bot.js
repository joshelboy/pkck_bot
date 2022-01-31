/**
 * @author Elias Tilegant
 * @version 0.0.2 2021
 * @description Main method of the script
 */

//Init requirements
const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { token} = require('./config/config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//Getting commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.buttons = new Collection();
const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));

//Database setup
const { Pool } = require('pg');
const { user, host, database, password, port } = require('./config/db_config.json');
const db_pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
});


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

//Init subs database
const createSubs = 'CREATE TABLE IF NOT EXISTS subs (title varchar, username varchar, alreadySeen boolean, lastprice varchar)';

db_pool.connect(function (err, db_client, done) {
    db_client.query(createSubs, (err, res) => {
        if (err){
            console.error(err);
        }
        else {
            console.log("DB initialized");
        }
    })
    done();
})

client.login(token);