const nodeCron = require("node-cron");
const generateW2G = require("../scripts/generateW2G");
const mfTracker = require("../scripts/mfTracker");
const strava_refresh = require("../scripts/strava_refresh");
const strava_getter = require("../scripts/strava_getter");
const invite_manager = require("../scripts/invite_manager");

async function generate() {
  await generateW2G.execute();
}

async function startJob(client) {
  /*
    *      *      *    *          *     *
    second minute hour dayOfMonth month dayOfWeek
 */
  //const jobW2G = nodeCron.schedule("0 0 18 * * *", generate);
  //const jobMF = nodeCron.schedule("0 1 * * * *", fetch(client));
}

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const jobW2G = nodeCron.schedule("0 0 18 * * *", generate);

    const jobMF = nodeCron.schedule("00 * * * * *", () => {
      mfTracker.execute(client);
    });

    const jobStravaRefresh = nodeCron.schedule("0 0 */1 * * *", () => {
      strava_refresh.execute();
    });

    const jobStravaGet = nodeCron.schedule("0 1 */1 * * *", () => {
      strava_getter.execute();
    });

    const jobInviteSend = nodeCron.schedule("*/10 * * * * *", () => {
      invite_manager.execute(client);
    });
  },
};
