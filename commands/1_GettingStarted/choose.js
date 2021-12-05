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
    data: new SlashCommandBuilder()
        .setName('choose')
        .setDescription('Choose your starter Pokémon!'),
    async execute(client, interaction) {
        let starterEmbed = new MessageEmbed()

        let user = await User.findOne({
            id: interaction.user.id
        })
        if (user) {
            await interaction.reply({
                content: `You've already chosen a starter pokémon!`,
                ephemeral: true
            })
            return
        } else {
            // const row1 = new MessageActionRow()
            //     .addComponents(
            //         new MessageButton()
            //             .setCustomId('bulbasaur')
            //             .setLabel('Bulbasaur')
            //             .setStyle('SECONDARY'),
            //         new MessageButton()
            //             .setCustomId('charmander')
            //             .setLabel('Charmander')
            //             .setStyle('SECONDARY'),
            //         new MessageButton()
            //             .setCustomId('squirtle')
            //             .setLabel('Squirtle')
            //             .setStyle('SECONDARY'),
            //         new MessageButton()
            //             .setCustomId('chikorita')
            //             .setLabel('Chikorita')
            //             .setStyle('SECONDARY'),
            //         new MessageButton()
            //             .setCustomId('cyndaquil')
            //             .setLabel('Cyndaquil')
            //             .setStyle('SECONDARY')                        
            //     );
            // const row2 = new MessageActionRow()
            //     .addComponents(
            //         new MessageButton()
            //             .setCustomId('totodile')
            //             .setLabel('Totodile')
            //             .setStyle('SECONDARY'),
            //         new MessageButton()
            //             .setCustomId('treecko')
            //             .setLabel('Treecko')
            //             .setStyle('SECONDARY'),
            //         new MessageButton()
            //             .setCustomId('torchic')
            //             .setLabel('Torchick')
            //             .setStyle('SECONDARY'),
            //         new MessageButton()
            //             .setCustomId('mudkip')
            //             .setLabel('Mudkip')
            //             .setStyle('SECONDARY'),
            //         new MessageButton()
            //             .setCustomId('turtwig')
            //             .setLabel('Turtwig')
            //             .setStyle('SECONDARY')                        
            //     );
            //     const row3 = new MessageActionRow()
            //     .addComponents(
            //         new MessageButton()
            //             .setCustomId('chimchar')
            //             .setLabel('Chimchar')
            //             .setStyle('SECONDARY'),
            //         new MessageButton()
            //             .setCustomId('piplup')
            //             .setLabel('Piplup')
            //             .setStyle('SECONDARY'),
            //         new MessageButton()
            //             .setCustomId('snivy')
            //             .setLabel('Snivy')
            //             .setStyle('SECONDARY'),
            //         new MessageButton()
            //             .setCustomId('tepig')
            //             .setLabel('Tepig')
            //             .setStyle('SECONDARY'),
            //         new MessageButton()
            //             .setCustomId('oshawott')
            //             .setLabel('Oshawott')
            //             .setStyle('SECONDARY')                        
            //     );
                const selectMenu = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('gen')
                            .setPlaceholder('Select the generation of your starter pokemon!')
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
                                }                             
                            ])
                    )

            let starterPokemon = new MessageEmbed()
            .setTitle('Select the generation of your starter pokemon!')
            .setTimestamp()
            .setColor("BLURPLE")

            await interaction.reply({
                embeds: [starterPokemon],
                ephemeral: true,
            components: [selectMenu]
            })
        }

    }
}