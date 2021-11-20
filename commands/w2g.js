const { SlashCommandBuilder } = require('@discordjs/builders');
const w2gMessage = require('../subcommands/w2gMessage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('w2g')
        .setDescription('Erstelle einen W2G Raum!'),
    async execute(interaction) {

        //delete require.cache[require.resolve('../w2gLink')];
        //const { link, timestamp } = require('../w2gLink');

        w2gMessage.execute(interaction, false);


        /*
        let finishedLink;
        if (link !== undefined && link !== "") {

            //Merging elements together
            finishedLink = "https://w2g.tv/rooms/" + link + "?lang=de";

            //Defining buttons
            const buttonRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('W2G')
                        .setStyle('LINK')
                        .setURL(finishedLink),
                    new MessageButton()
                        .setCustomId('regenerateW2G')
                        .setLabel('Neuen Link erstellen')
                        .setStyle('DANGER'),
                )

            //Layout of the message
            const w2gEmbed = new MessageEmbed()
                .setColor('#fbce3b')
                .setTitle('Watch2Gether')
                .setURL(finishedLink)
                .setThumbnail('https://w2g.tv/static/watch2gether-share.jpg')
                .setFields(
                    { name: 'Angefordert von: ', value: interaction.user.username, inline: true},
                    { name: 'Erstellt um: ', value: new Date().toLocaleString('de-DE', { timeZone: 'UTC' }), inline: true},
                )


            //await interaction.reply({content: finishedLink, components: [buttonRow]});
            await interaction.reply({embeds: [w2gEmbed], components: [buttonRow]});
        } else {
            finishedLink = "Link konnte nicht erstellt werden 😔";
            await interaction.reply({content: finishedLink});
        }*/

    },
};