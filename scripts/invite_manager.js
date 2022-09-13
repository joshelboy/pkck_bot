const { Pool } = require("pg");
const {
    user,
    host,
    database,
    password,
    port,
} = require("../config/db_config.json");
const {MessageActionRow, MessageButton} = require("discord.js");

const db_pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
});

const get_new_invites = `SELECT * FROM invites WHERE status = 'created'`;
const get_event_list = `SELECT * FROM events`;

var event_list;

module.exports = {
    name: "inviteManager",
    async execute(client) {
        try {
            db_pool.connect(function (err, db_client, done) {
                if (err) {
                    return console.log(err);
                }

                db_client.query(get_event_list, (err, res) => {
                    if (err) {
                        return console.log(err);
                    }
                    if (res) {
                        event_list = res.rows;
                    }
                });

                db_client.query(get_new_invites, async (err, res) => {
                    if (err) {
                        return console.error(err);
                    }
                    if (res) {
                        try {
                            for (let row of res.rows) {
                                const targetUser = await  client.users.fetch(row.userID);
                                let targetEvent;

                                for (let event of event_list) {
                                    if (event.id == row.eventID) {
                                        targetEvent = event;
                                        console.log('Found event: ' + targetEvent.title);
                                    }
                                }

                                const buttonRow = new MessageActionRow().addComponents(
                                    new MessageButton()
                                        .setCustomId("invite_accept&" + row.id)
                                        .setLabel("Annehmen")
                                        .setStyle("SUCCESS"),
                                    new MessageButton()
                                        .setCustomId("invite_decline&" + row.id)
                                        .setLabel("Ablehnen")
                                        .setStyle("DANGER")
                                );

                                event_date = new Date(targetEvent.date.toDateString());

                                event_date = event_date.toLocaleDateString("de-DE", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                });

                                await targetUser.send({
                                    content: `🍔🍖🔥 Du wurdest soeben zum Event  "${targetEvent.title}" eingeladen! Das Event startet am ${event_date} um ${targetEvent.time} Uhr. Die Location ist ${targetEvent.location} 🔥🍖🍔`,
                                    components: [buttonRow]
                                });

                                //await targetUser.send(`Guten Tag TÜV-BBQ Mitglied! Du wurdest für das Event ${targetEvent.title} eingeladen. Das Event startet am ${targetEvent.date} um ${targetEvent.time} Uhr. [WIP-Debug-Code: ${row.id}]`);

                                db_client.query(`UPDATE invites SET status = 'sent' WHERE id = ${row.id}`, (err, res) => {
                                    if (err) {
                                        return console.error(err);
                                    }
                                    if (res) {
                                        console.log(`Updated invite ${row.id} to status 'sent'`);
                                    }
                                });




                            }
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                });
                done();
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}