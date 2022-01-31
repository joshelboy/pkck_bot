const { Pool } = require('pg');
const Parser = require("rss-parser");
const rssParser = new Parser();
const { user, host, database, password, port } = require('../config/db_config.json');

const db_pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
});

const select = `SELECT * FROM subs a INNER JOIN products b ON LOWER(b.full_title) LIKE LOWER(CONCAT('%', a.title, '%'))`;
const refresh = 'DROP TABLE IF EXISTS products; CREATE TABLE IF NOT EXISTS products (full_title varchar, link varchar)'
const changeSeen = `UPDATE subs SET alreadyseen = false FROM (SELECT * FROM subs a WHERE NOT EXISTS (SELECT * FROM products b WHERE LOWER(b.full_title) LIKE LOWER(CONCAT('%', a.title, '%')))) as c WHERE c.title = subs.title`;

module.exports = {
    name: "mfTracker.js",
    async execute(client) {
        try {
            let feed = await rssParser.parseURL('https://www.mindfactory.de/xml/rss/mindstar_artikel.xml');

            db_pool.connect(function (err, db_client, done) {
                if (err) {
                    return console.log(err);
                }

                db_client.query(refresh, (err, res) => {
                    if (err) {
                        return console.error(err);
                    }
                    if (res) {

                    }
                })

                for (let item of feed.items) {
                    let insert = `INSERT INTO products (full_title, link)
                                  VALUES ('` + item.title + `', '` + item.link + `')`;

                    db_client.query(insert, (err, res) => {
                        if (err) {
                            console.log(err);
                            return;
                        }

                    });
                }
                db_client.query(select, async (err, res) => {
                    for (let row of res.rows) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (row.alreadyseen == false) {
                            try {
                                const targetUser = await client.users.fetch(row.username);
                                await targetUser.send("'" + row.full_title + "'" + ' ist im MindStar aufgetaucht: ' + row.link);
                            } catch (err) {
                                console.log(err)
                            }
                            console.log("New Product!" + row.full_title);
                        }
                        let update = `UPDATE subs
                                      SET alreadySeen = true
                                      WHERE title = '` + row.title + `'`;
                        db_client.query(update, async (err, res) => {
                            if (err) {
                                console.log(err)
                                return;
                            }
                            //await console.log("Saw subbed product " + row.full_title);
                        });

                    }
                })

                db_client.query(changeSeen, (err, res) => {
                    for (let row of res.rows){
                        if (err) {
                            return console.error(err);
                        }
                    }
                })
                done();
            })
        }
        catch (err){
            console.error(err);
        }
    }
}