const generateW2G = require('../generateW2G');
const w2gMessage = require('../subcommands/w2gMessage');


module.exports = {
    customId: 'regenerateW2G',
    name: 'regenerateW2G',
    async execute(interaction) {

        await generateW2G.execute();
        //link = w2gReturn[0];
        //timestamp = w2gReturn[1];

        w2gMessage.execute(interaction, true);

        /*
        console.log("Starting to generate new Link...");
        newLink = await generateW2G.execute();
        console.log("New link generated!");
        if (newLink !== undefined && newLink !== "") {
            finishedLink = "https://w2g.tv/rooms/" + newLink + "?lang=de";

            //Button row
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

            //Eingebettete Nachricht
            const w2gEmbed = new MessageEmbed()
                .setColor('#fbce3b')
                .setTitle('Watch2Gether')
                .setURL(finishedLink)
                .setThumbnail('https://w2g.tv/static/watch2gether-share.jpg')
                .setFields(
                    { name: 'Angefordert von: ', value: interaction.user.username, inline: true},
                    { name: 'Erstellt um: ', value: new Date().toLocaleString('de-DE', { timeZone: 'UTC' }), inline: true},
                )


            await interaction.update({embeds: [w2gEmbed], components: [buttonRow]});

        } else {
            finishedLink = "Link konnte nicht erstellt werden 😔";
            await interaction.reply({content: finishedLink});
        } */
    },
};