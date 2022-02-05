const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const axios = require("axios");
const { capitalize, getlength } = require("../../functions.js");
const { readFileSync } = require('fs')
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const legends = readFileSync("./db/legends.txt").toString().trim().split("\n").map(r => r.trim());
const legends2 = readFileSync("./db/legends2.txt").toString().trim().split("\n").map(r => r.trim());
const mythics = readFileSync("./db/mythics.txt").toString().trim().split("\n").map(r => r.trim());
const alolans = readFileSync("./db/alolans.txt").toString().trim().split("\n").map(r => r.trim());
const ub = readFileSync("./db/ub.txt").toString().trim().split("\n").map(r => r.trim());
const galarians = readFileSync("./db/galarians.txt").toString().trim().split("\n").map(r => r.trim());
const dex = readFileSync("./db/dex.txt").toString().trim().split("\n").map(r => r.trim());
const Shiny = require('../../db/shiny.js');
const Gen8 = require('../../db/gen8.js');
const Forms = require('../../db/forms.js');
const Galarians = require('../../db/galarians.js');
const Mega = require('../../db/mega.js');
const mega = require('../../db/mega.js');
const ShinyMega = require('../../db/mega-shiny.js');
const Shadow = require('../../db/shadow.js');
const Gmax = require('../../db/gmax.js');
const Primal = require('../../db/primal.js');
const Altnames = require('../../db/altnames.js');
const Levelup = require('../../db/levelup.js');
const Pokemon = require('../../db/pokemon.js');
const Concept = require('../../db/concept.js');
const Attacks = require('../../db/attacks.js');
const ms = require("ms");

const {
    SlashCommandBuilder
} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dex')
        .setDescription('Displays Pokedex!')
        .addStringOption(option =>
            option.setName('page')
                .setDescription('The page to display.')
                .setRequired(false)),
    async execute(client, interaction) {

        let user = await User.findOne({ id: interaction.user.id })
        if (!user) return interaction.reply({
            content: `You haven't caught any pokemons yet. Start off with \`/start\`!`
        })

        for (var x = 0; x < user.caught.length; x++) {
            if (!user.caught[x].name) {
                user.caught.splice(user.caught.indexOf(user.caught[x]), 1);
                await user.markModified(`caught`);
                await user.save();
            }
        }
        user.caught = getUnique(user.caught);

        const page = interaction.options.getString('page');
        if(!page) {
            let chunks = 0
            let n = user.caught.length || 0;
            const embed1 = new Discord.MessageEmbed()
                .setAuthor(`${interaction.user.username}'s Pokedex:`)
                .setColor('ad00ad')
                .setDescription(`**Dex Count**: ${dex.length}\n**Dex Entries**: ${n}\n\n*Nothing to show in this page.*`)

        }

        interaction.reply({
            content: 'i work'
        })
    }
}
