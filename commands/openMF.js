const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("m")
        .setDescription("Du erhälst den Link vom MindStar"),
    async execute(interaction) {
        await interaction.reply('https://www.mindfactory.de/Highlights/MindStar');
    },
};