const { Pool } = require("pg");
const {
    user,
    host,
    database,
    password,
    port,
} = require("../config/db_config.json");

const db_pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
});

module.exports = {
    customId: "invite_decline",
    name: "invite_decline",
    async execute(interacton, id) {
        try {
            db_pool.connect(function (err, db_client, done) {
                if (err) {
                    return console.log(err);
                }
                db_client.query(`UPDATE invites SET status = 'decline' WHERE id = ${id}`, async (err, res) => {
                    if (err) {
                        return console.error(err);
                    }
                    if (res) {
                        console.log(`Updated invite ${id} to status 'decline'`);
                        await interacton.update({content: "Du hast die Einladung abgelehnt. ⛔", components: []});
                    }
                });
                done();
            });
        } catch (error) {
            await interacton.update({ content: "Es ist ein Fehler aufgetreten!", components: [] });
        }
    },
};