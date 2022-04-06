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
  customId: "selectMindFactory",
  name: "selectMindFactory",
  async execute(interaction) {
    let deleteEntry =
      `DELETE FROM subs WHERE username = '` +
      interaction.user.id +
      `' AND title = '` +
      interaction.values +
      `'`;

    db_pool.connect(function (err, db_client, done) {
      db_client.query(deleteEntry, (err, res) => {
        if (err) {
          interaction.update(
            "Abo konnte nicht gelöscht werden. Wende dich bitte an Elias."
          );
        } else {
          interaction.update({
            content: "Das Abo wurde erfolgreich gelöscht. 🗑️",
            components: [],
          });
        }
        done();
      });
    });
  },
};
