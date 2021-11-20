//Init
const fetch = require('node-fetch');
const { url, method, type, apiKey, share, bg_color, bg_opacity } = require('./w2g.json');
const fs = require('fs');

//Defining params for fetch request
const headers = {
    'Accept': type,
    'Content-Type': type
}
const data = JSON.stringify({
   "w2g_api_key": apiKey,
   "share": share,
   "bg_color": bg_color,
   "bg_opacity": bg_opacity,
});

/**
 * @return Return is needed, because u need a promise for await to work
 * @type {{name: string, execute(): Promise<*|string>}}
 */
module.exports = {
    name: "generateW2G",
    async execute() {

            return fetch(url, {method: method, headers: headers, body: data})
                .then(response => response.json())
                .then(function (data) {

                    let link;
                    let timestamp = new Date().toLocaleString('de-DE', {timeZone: 'UTC'});

                    //Merging data for link
                    if (data.streamkey !== undefined && data.streamkey !== "" && data.streamkey !== null) {
                        link = "https://w2g.tv/rooms/" + data.streamkey + "?lang=de";
                    } else {
                        link = undefined;
                    }


                    const fetchedData = '{"link":' + '"' + link + '",' + '"timestamp":' + '"' + timestamp + '"' + '}';
                    const jsonFile = JSON.stringify(JSON.parse(fetchedData));


                    fs.writeFile("w2gLink.json", jsonFile, 'utf8', function (err) {
                        if (err) {
                            console.log("An error occured while writing JSON Object to File.");
                        }

                        console.log("JSON file has been saved.");
                    });

                    return [link, timestamp];
                });
        }
};