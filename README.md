# Discord Watch2Gether Bot
(And more coming soon)

This is a simple Discord Bot unsing discord.js.

# Needed modules
* discord.js
* node-fetch
* fs
* @discordjs/builders
* @discordjs/rest
* discord-api-types/v9

# Changes to the code u need to do

If u want to use this project, make sure to get the following 4 things
and enter them into the *config.json* and *w2g.json*.

## w2g.json
apiKey -> https://community.w2g.tv/t/watch2gether-api-documentation/133767

## config.json
token -> Get it from the Discord Dev page
clientId -> Get it from the Discord Dev page
guildId -> enable developer mode in Discord via settings, rightclick the server and click "copy Id"

### Note
You could also change the code to "global slash commands"

## Create new commands
To create new commands u just need to create a new Module in "Commands". The
eventhandler is automaticly calling it, when ist command is getting used.
Same for buttons. Look out for labeling misstakes.
*Run "deploy-commands"* after u created new commands. Global commands may take up to 1h to register.

# For u to do
* create service file for the bot AND the generateW2G
* call generateW2G every 24h or add a function call into the bot script
