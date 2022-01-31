const { SlashCommandBuilder } = require('@discordjs/builders');
const w2gMessage = require('../subcommands/w2gMessage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('w2g')
        .setDescription('Erstelle einen W2G Raum!'),
    async execute(interaction) {
        w2gMessage.execute(interaction, false);
    },
};