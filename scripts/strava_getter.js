/**
 * Used https instead of 'strava-v3' or any other node.js package, because they all didnt seem to
 * work or atleast had a sh*t documentation
 */
const https = require("https");
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

const refresh =
  "DROP TABLE IF EXISTS strava; CREATE TABLE IF NOT EXISTS strava (title varchar, distance varchar, date date, athlete varchar, type varchar)";
const select = "SELECT * FROM users";

module.exports = {
  name: "strava_getter.js",
  async execute() {
    try {
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
        });

        db_client.query(select, (err, res) => {
          if (err) {
            console.log(err);
          }
          if (res) {
            for (let row of res.rows) {
              let name = row.strava_name;

              for (let pageCounter = 1; pageCounter < 5; pageCounter++) {
                const options = {
                  hostname: "www.strava.com",
                  path:
                    "/api/v3/athlete/activities?before&after&page=" +
                    pageCounter +
                    "&per_page=99",
                  headers: {
                    Authorization: "Bearer " + row.strava_access_token,
                  },
                };

                https.get(options, (response) => {
                  let result = "";
                  response.on("data", function (chunk) {
                    result += chunk;
                  });

                  response.on("end", function () {
                    if ((result == null) | (result == "") | (result == "[]")) {
                      pageCounter = 5;
                      console.log("Page: " + pageCounter);
                      return;
                    }
                    result = JSON.parse(result);
                    for (let i = 0; i < result.length; i++) {
                      let tour = result[i];

                      let insertRow =
                        "INSERT INTO strava (title, distance, date, athlete, type) VALUES ($1, $2, $3, $4, $5)";
                      let insertRow_values = [
                        tour.name,
                        tour.distance,
                        tour.start_date_local,
                        name,
                        tour.type,
                      ];

                      db_client.query(
                        insertRow,
                        insertRow_values,
                        (err, res) => {
                          if (err) {
                            return console.error(err);
                          }
                          if (res) {
                          }
                        }
                      );
                    }
                  });
                });
              }
            }
          }
        });

        done();
      });
    } catch (err) {
      console.log(err);
    }
  },
};
