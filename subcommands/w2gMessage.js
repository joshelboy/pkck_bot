const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");
let errorMessage = "Link konnte nicht erstellt werden 😔";
let link;
let timestamp;
let jsonData;
const fs = require('fs');
module.exports = {

    name: 'w2gMessage',

    async execute(interaction, edit) {

        fs.readFile("./w2gLink.json", "utf8", (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err);
                return;
            }
            setData(jsonString);
        });

        function setData(jsonString){
            jsonData = JSON.parse(jsonString);
            link = jsonData.link;
            timestamp = jsonData.timestamp;

            makeMessage(link, timestamp);

        };

        //delete require.cache[require.resolve('../w2gLink')];
        //const { link, timestamp } = require('../w2gLink');

        async function makeMessage(link, timestamp) {
            if (link !== undefined) {

                const buttonRow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('W2G')
                            .setStyle('LINK')
                            .setURL(link),
                        new MessageButton()
                            .setCustomId('regenerateW2G')
                            .setLabel('Neuen Link erstellen')
                            .setStyle('DANGER'),
                    )

                //Layout of the message
                const w2gEmbed = new MessageEmbed()
                    .setColor('#fbce3b')
                    .setTitle('Watch2Gether')
                    .setURL(link)
                    .setThumbnail('https://w2g.tv/static/watch2gether-share.jpg')
                    .setFields(
                        {name: 'Angefordert von: ', value: interaction.user.username, inline: true},
                        {name: 'Erstellt um: ', value: timestamp, inline: true},
                    )

                if (edit == true) {
                    //Message when link is getting refreshed
                    await interaction.update({embeds: [w2gEmbed], components: [buttonRow]});

                } else {
                    //Message when Message is completely new
                    await interaction.reply({embeds: [w2gEmbed], components: [buttonRow]});
                }
            } else {
                if (edit == true) {
                    await interaction.update({content: errorMessage});
                } else {
                    await interaction.reply({content: errorMessage});
                }
            }
        }
    }

}