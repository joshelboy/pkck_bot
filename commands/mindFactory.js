const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const { MessageActionRow, MessageSelectMenu } = require("discord.js");

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
  name: "mindFactory",
  data: new SlashCommandBuilder()
    .setName("mf")
    .setDescription("Verwalte deine MF Subs")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("subscribe")
        .setDescription("Abonnieren eines Produktes")
        .addStringOption((option) =>
          option
            .setName("artikel")
            .setDescription("Titel des Produkts")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("unsubscribe")
        .setDescription("Listet alle aktiven Abos auf")
    ),
  async execute(interaction) {
    try {
      let typ = interaction.options.getSubcommand();
      let artikel = interaction.options.get("artikel");
      let author2 = interaction.user.id;

      let selectSubs = `SELECT * FROM subs WHERE username = '` + author2 + `'`;

      if (typ === "subscribe") {
        let lastprice = "0€";
        let insert =
          `INSERT INTO subs (title, username, alreadyseen, lastprice) VALUES ('` +
          artikel.value +
          `', '` +
          author2 +
          `', '` +
          false +
          `', '` +
          lastprice +
          `')`;

        db_pool.connect(async function (err, db_client, done) {
          if (err) {
            return console.error(err);
          }
          db_client.query(insert, (res, err) => {
            if (err) {
              return console.error(err);
            }
          });
          done();
          await interaction.reply({
            content:
              "Du erhälst ab sofort eine DM, falls ein Produktname mit dem Inhalt '" +
              artikel.value +
              "' im Mindstar auftaucht. ✅",
            ephemeral: true,
          });
        });
      } else if (typ === "unsubscribe") {
        let options = [];

        db_pool.connect(function (err, db_client, done) {
          if (err) {
            return console.error(err);
          }
          db_client
            .query(selectSubs)
            .then((res) => {
              for (let i = 0; i < res.rows.length; i++) {
                //console.log(res.rows[i].title)
                options.push({
                  label: res.rows[i].title,
                  value: res.rows[i].title,
                });
              }
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(async () => {
              const row = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                  .setCustomId("selectMindFactory")
                  .setPlaceholder("Nothing selected")
                  .addOptions(options)
              );
              try {
                await interaction.reply({
                  content: "Wähle dein Deabo aus:",
                  components: [row],
                  ephemeral: true,
                });
              } catch (err) {
                await interaction.reply({
                  content:
                    "Es sieht so aus, als hättest du noch keine Abos. 😔",
                  ephemeral: true,
                });
              }
              done();
            });
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
