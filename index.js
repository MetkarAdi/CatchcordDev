const {
    Client,
    Collection,
    Intents,
} = require('discord.js')
require('dotenv').config()
const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9')
const colors = require('colors')
const mongoose = require('mongoose')

const clientID = '906908565715947611'
const guildID = '878030078053843026'

const token = process.env.TOKEN
const mongoURI = process.env.Mongo

const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});
const fs = require('fs')

const commandsArray = [];

const rest = new REST({
    version: '9'
}).setToken(token);


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command);
    commandsArray.push(command.data.toJSON());
}

const gettingStarted = fs.readdirSync('./commands/1_GettingStarted').filter(file => file.endsWith('.js'))
for (const file of gettingStarted) {
    const command = require(`./commands/1_GettingStarted/${file}`)
    client.commands.set(command.data.name, command)
    commandsArray.push(command.data.toJSON())
}

const selectMenus = fs.readdirSync('./commands/SelectMenus').filter(file => file.endsWith('.js'))
for (const file of selectMenus) {
    const command = require(`./commands/SelectMenus/${file}`)
    client.commands.set(command.name, command)
    // commandsArray.push(command.data.toJSON())
}

const buttonFiles = fs.readdirSync('./commands/ButtonFiles').filter(file => file.endsWith('.js'))
for (const file of buttonFiles) {
    const command = require(`./commands/ButtonFiles/${file}`)
    client.commands.set(command.name, command)
}

rest.put(Routes.applicationGuildCommands(clientID, guildID), {
    body: commandsArray
})
    .then(() => console.log('Registered the slash commands'))
    .catch(console.error)

client.on('ready', async () => {
    console.log('Bot is online!')
    // console.log(commandsArray)
    try {
        mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(async mon => {
            await console.log('Connected to DB!')
        })
    } catch (error) {
        console.log('error')
    }
})

client.on('interactionCreate', async interaction => {
    // console.log(interaction)
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName)
        if (!command) return;

        try {
            await command.execute(client, interaction)
        } catch (err) {
            console.log(err);
        }
    }
    if (interaction.isSelectMenu() || interaction.isButton()) {
        console.log(interaction.customId)
        client.commands.get(interaction.customId).execute(client, interaction)
    }

})



client.login(token)