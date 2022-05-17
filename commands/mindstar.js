const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ms')
        .setDescription('Du erhälst den Link vom MindStar'),
    async execute(interaction) {
        await interaction.reply({content: "https://www.mindfactory.de/Highlights/MindStar", ephemeral: true});
    },
};