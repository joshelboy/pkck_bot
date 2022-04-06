const generateW2G = require("../scripts/generateW2G");
const w2gMessage = require("../subcommands/w2gMessage");

module.exports = {
  customId: "regenerateW2G",
  name: "regenerateW2G",
  async execute(interaction) {
    await generateW2G.execute();

    w2gMessage.execute(interaction, true);
  },
};
