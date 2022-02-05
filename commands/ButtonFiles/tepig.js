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
const {
    SlashCommandBuilder
} = require('@discordjs/builders')

module.exports = {
    name: 'tepig',
    description: 'Choose this as your starter pokemon!',
    async execute(client, interaction) {
        if (interaction.isButton()) {
            console.log(interaction.customId)
            let shiny;
            let result;
            url = `https://pokeapi.co/api/v2/pokemon/${interaction.customId}`
            await axios.get(url).then(function (response) {
                // console.log(response);
                result = response;
            })
            // console.log(result);
            if (randomNumber(1, 100) < 1) {
                shiny = true;
                sprite = `https://play.pokemonshowdown.com/sprites/xyani-shiny/${interaction.customId}.gif`
            } else {
                shiny = false;
                sprite = `https://play.pokemonshowdown.com/sprites/xyani/${interaction.customId}.gif`
                await axios.get(sprite).then(function (response) {
                    console.log(response);
                })
            }

            let poke = new Pokemon({ name: capitalize(interaction.customId), shiny: shiny, rarity: 'Common', url: url });
            poke = await classToPlain(poke)
            // console.log(poke);

            await new User({ id: interaction.user.id }).save();
            let user = await User.findOne({ id: interaction.user.id })
            user.pokemons.push(poke);
            await user.markModified(`pokemons`);
            await user.save()

            // console.log(user)
            let embed1 = new MessageEmbed()
                .setDescription(`**Congratulations on starting your journey <@${interaction.user.id}>**! **${capitalize(interaction.customId)}** is your starter Pokémon. Type \`.info\` to get it's stats!`)
                .setColor('#ad00ad')
                .setThumbnail(sprite)
            return interaction.update({
                embeds: [embed1],
                components: [],
                ephemeral: true
            })

        }
    }
}