module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction);
        console.log(
          `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
        );
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "Dieser Command hat leider nicht funktioniert...",
          ephemeral: true,
        });
      }
    }

    if (interaction.isButton()) {
      let customId = interaction.customId;
      customId = customId.split("&");
      let button = customId[0];
      let value = customId[1];

      try {
        if (value != undefined) {
          await require(`../buttons/${button}`).execute(interaction, value);
        } else {
            await require(`../buttons/${button}`).execute(interaction);
        }
        } catch (error) {
        console.error(error);
      }
    }

    if (interaction.isSelectMenu()) {
      const select = interaction.customId;
      try {
        await require(`../select_menus/selectMindFactory.js`).execute(
          interaction
        );
      } catch (err) {
        console.error(err);
      }
    }
  },
};
