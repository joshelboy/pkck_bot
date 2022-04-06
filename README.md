# Discord Bot to test my coding skills
Disclaimer: This is early phase software and could have major quality issues.

This is a Discord Bot using discord.js to create *Watch2Gether* Rooms and notifiys users when a desired product is listed for sale (only *MindFactory* atm).

## Example images
![image](https://user-images.githubusercontent.com/45147025/151826184-1ded7f77-bb1f-4338-8601-706f6bdb2484.png)

## Whats new in the latest comit
* added possibility to get notified, when a product in the shop of a german retailer gets listed at the "SALE"-Part of the Shop (via rss)
* improved overall project structure
* u now need a postgre DB in order to run the full functionality of the bot

![image](https://user-images.githubusercontent.com/45147025/151825910-c1af3e10-b063-4853-8f47-83e3f5d0986b.png)
![image](https://user-images.githubusercontent.com/45147025/151826095-a8243989-f1ee-4327-95f8-764f3def537b.png)
![image](https://user-images.githubusercontent.com/45147025/151826139-5315bd46-c979-40b5-af29-aae01d2bb5e2.png)

---

## Needed modules

Install all modules via
```bash
npm i
```

*    discord.js
*    node-cron
*    node-fetch
*    fs
*    rss-parser
*    @discordjs/builders
*    @discordjs/rest
*    discord-api-types/v9
*    node-postgres

I might have missed a package. Remember: This is early phase software.

Note: node-postgres install command ist *npm install pg*

## Changes to the config you need to do

If u want to use this project, make sure to get the following 4 things
and enter them into the *config.json*, *w2g.json* and *db_config.json*.

### w2g.json
apiKey -> https://community.w2g.tv/t/watch2gether-api-documentation/133767

### config.json
token -> Get it from the Discord Dev page
clientId -> Get it from the Discord Dev page
guildId -> enable developer mode in Discord via settings, rightclick the server and click "copy Id"

### db_config.json
Enter ur credentials in the specific fields. Every field is necessary!

### Note
You could also change the code to "global slash commands"

## Create new commands
To create new commands u just need to create a new Module in "Commands". The
eventhandler is automaticly calling it, when ist command is getting used.
Same for buttons. Look out for labeling misstakes.
*Run "deploy-commands"* after u created new commands. Global commands may take up to 1h to register.

## Other things i suggest for you to do
*   create service file for the bot
*   call the deploy-commands.js file, so the commands will be suggested in Discord.
