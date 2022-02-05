const Discord = require("discord.js");
const {
    MessageEmbed,
    MessageCollector,
    Collection,
    MessageActionRow,
    MessageButton,
    MessageSelectMenu
} = require("discord.js");
const axios = require('axios');
const {
    randomNumber,
    capitalize
} = require("../../functions.js");
const {
    classToPlain
} = require("class-transformer");
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const gen8 = require("../../db/gen8.js");
var pokemon = require("../../db/pokemon.js");
const ms = require("ms");
const Pokemon = require("../../Classes/Pokemon");
let starters = ["bulbasaur", "charmander", "squirtle",
    "chikorita", "cyndaquil", "totodile",
    "treecko", "torchic", "mudkip",
    "turtwig", "chimchar", "piplup",
    "snivy", "tepig", "oshawott",
    "chespin", "fennekin", "froakie",
    "rowlet", "litten", "popplio",
    "grookey", "scorbunny", "sobble"
];
let gen8Starters = ["grookey", "scorbunny", "sobble"];
const {
    SlashCommandBuilder
} = require('@discordjs/builders')

module.exports = {
    name: 'StarterGen',
    description: 'Dropdown to select generation of Started pokemon',
    async execute(client, interaction) {
        if (interaction.isSelectMenu()) {
            const selectedGen = interaction.values[0]
            console.log(selectedGen)
            if (selectedGen == 'gen1') {
                const row1 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('bulbasaur')
                            .setLabel('Bulbasaur')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('charmander')
                            .setLabel('Charmander')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('squirtle')
                            .setLabel('Squirtle')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('pikachu')
                            .setLabel('Pikachu')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('goBack')
                            .setLabel('Go back')
                            .setStyle('DANGER')
                    );
                const embed = new MessageEmbed()
                    .setAuthor('You selected Gen1 Starters! Choose one of the following pokemons as your starter pokemon.')
                    .setColor("BLURPLE")
                    .setTimestamp()

                interaction.update({
                    ephemeral: true,
                    embeds: [embed],
                    components: [row1],
                })
            } else if (selectedGen == 'gen2') {
                const row1 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('chikorita')
                            .setLabel('Chikorita')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('cyndaquil')
                            .setLabel('Cyndaquil')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('totodile')
                            .setLabel('Totodile')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('goBack')
                            .setLabel('Go Back')
                            .setStyle('DANGER'),
                    )
                const embed = new MessageEmbed()
                    .setAuthor('You selected Gen2 Starters! Choose one of the following pokemons as your starter pokemon.')
                    .setColor("BLURPLE")
                    .setTimestamp()

                interaction.update({
                    ephemeral: true,
                    embeds: [embed],
                    components: [row1],
                })
            } else if (selectedGen == 'gen3') {
                const row1 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('treecko')
                            .setLabel('Treecko')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('torchic')
                            .setLabel('Torchic')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('mudkip')
                            .setLabel('Mudkip')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('goBack')
                            .setLabel('Go Back')
                            .setStyle('DANGER'),
                    )
                const embed = new MessageEmbed()
                    .setAuthor('You selected Gen3 Starters! Choose one of the following pokemons as your starter pokemon.')
                    .setColor("BLURPLE")
                    .setTimestamp()

                interaction.update({
                    ephemeral: true,
                    embeds: [embed],
                    components: [row1],
                })
            } else if (selectedGen == 'gen4') {
                const row1 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('turtwig')
                            .setLabel('Turtwig')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('chimchar')
                            .setLabel('Chimchar')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('piplup')
                            .setLabel('Piplup')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('goBack')
                            .setLabel('Go Back')
                            .setStyle('DANGER'),
                    )
                const embed = new MessageEmbed()
                    .setAuthor('You selected Gen4 Starters! Choose one of the following pokemons as your starter pokemon.')
                    .setColor("BLURPLE")
                    .setTimestamp()

                interaction.update({
                    ephemeral: true,
                    embeds: [embed],
                    components: [row1],
                })
            } else if (selectedGen == 'gen5') {
                const row1 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('snivy')
                            .setLabel('Snivy')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('tepig')
                            .setLabel('Tepig')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('oshawott')
                            .setLabel('Oshawott')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('goBack')
                            .setLabel('Go Back')
                            .setStyle('DANGER'),
                    )
                const embed = new MessageEmbed()
                    .setAuthor('You selected Gen5 Starters! Choose one of the following pokemons as your starter pokemon.')
                    .setColor("BLURPLE")
                    .setTimestamp()

                interaction.update({
                    ephemeral: true,
                    embeds: [embed],
                    components: [row1],
                })
            } else if (selectedGen == 'gen6') {
                const row1 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('chespin')
                            .setLabel('Chespin')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('fennekin')
                            .setLabel('Fennekin')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('froakie')
                            .setLabel('Froakie')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('goBack')
                            .setLabel('Go Back')
                            .setStyle('DANGER'),
                    )
                const embed = new MessageEmbed()
                    .setAuthor('You selected Gen6 Starters! Choose one of the following pokemons as your starter pokemon.')
                    .setColor("BLURPLE")
                    .setTimestamp()

                interaction.update({
                    ephemeral: true,
                    embeds: [embed],
                    components: [row1],
                })
            } else if (selectedGen == 'gen7') {
                const row1 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('rowlet')
                            .setLabel('Rowlet')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('litten')
                            .setLabel('Litten')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('popplio')
                            .setLabel('Popplio')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('goBack')
                            .setLabel('Go Back')
                            .setStyle('DANGER'),
                    )
                const embed = new MessageEmbed()
                    .setAuthor('You selected Gen7 Starters! Choose one of the following pokemons as your starter pokemon.')
                    .setColor("BLURPLE")
                    .setTimestamp()

                interaction.update({
                    ephemeral: true,
                    embeds: [embed],
                    components: [row1],
                })
            } else if (selectedGen == 'gen8') {
                const row1 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('grookey')
                            .setLabel('Grookey')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('scorbunny')
                            .setLabel('Scorbunny')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('sobble')
                            .setLabel('Sobble')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('goBack')
                            .setLabel('Go Back')
                            .setStyle('DANGER'),
                    )
                const embed = new MessageEmbed()
                    .setAuthor('You selected Gen8 Starters! Choose one of the following pokemons as your starter pokemon.')
                    .setColor("BLURPLE")
                    .setTimestamp()

                interaction.update({
                    ephemeral: true,
                    embeds: [embed],
                    components: [row1],
                })
            }
        }
    }
}