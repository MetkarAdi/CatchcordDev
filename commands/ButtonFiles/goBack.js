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
    name: 'goBack',
    desctiption: 'Dropdown to select generation of Started pokemon',
    async execute (client, interaction) {
        if(interaction.isButton()) {
            const selectMenu = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('StarterGen')
                            .setPlaceholder('Select the generation of your starter pokemon!')
                            .setMinValues(1)
                            .setMaxValues(1)
                            .addOptions([
                                {
                                    label: 'Gen 1',
                                    description: 'Choose from Gen 1 Starters',
                                    value: 'gen1'
                                }, {
                                    label: 'Gen 2',
                                    description: 'Choose from Gen 2 Starters!',
                                    value: 'gen2'
                                }, {
                                    label: 'Gen 3',
                                    description: 'Choose from Gen 3 Starters!',
                                    value: 'gen3'
                                }, {
                                    label: 'Gen 4',
                                    description: 'Choose from Gen 4 Starters!',
                                    value: 'gen4'
                                }, {
                                    label: 'Gen 5',
                                    description: 'Choose from Gen 5 Starters!',
                                    value: 'gen5'
                                }, {
                                    label: 'Gen 6',
                                    description: 'Choose from Gen 6 Starters!',
                                    value: 'gen6'
                                }, {
                                    label: 'Gen 7',
                                    description: 'Choose from Gen 7 Starters!',
                                    value: 'gen7'
                                }, {
                                    label: 'Gen 8',
                                    description: 'Choose from Gen 8 Starters!',
                                    value: 'gen8'
                                }    
                            ])
                    )

            let starterPokemon = new MessageEmbed()
            .setTitle('Select the generation of your starter pokemon!')
            .setTimestamp()
            .setColor("BLURPLE")

            await interaction.update({
                embeds: [starterPokemon],
                ephemeral: true,
            components: [selectMenu]
            })
        }
    }
}