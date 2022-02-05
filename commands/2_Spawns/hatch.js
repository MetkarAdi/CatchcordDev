const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, MessageAttachment, Collection } = require("discord.js");
const axios = require("axios")
const fs = require("fs");
const { classToPlain } = require("class-transformer");
const { capitalize, getlength } = require("../../functions.js");
const Pokemon = require("./../../Classes/Pokemon");
let Fishspawn = require('../../models/fish.js')
let Guild = require('../../models/guild.js')
// let images = require('../../images')
const User = require('../../models/user.js')

const Canvas = require('canvas')
const { loadImage } = require('canvas')
const canvas = Canvas.createCanvas(1192, 670);
const ctx = canvas.getContext('2d')
const {
    SlashCommandBuilder
} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hatch')
        .setDescription('Hatch a wild pokemon!'),
    async execute(client, interaction) {
        let user = await User.findOne({ id: interaction.user.id })
        if (!user) return interaction.reply({
            content: `You haven't started your journey yet! Start with \`/start\`!`
        })
        if (user.egg === 0) return interaction.reply({
            content: "You don't have enough eggs to hatch!",
            ephemeral: true
        })
        let result, sprite;
        let pokemon = ["pichu", "cleffa", "igglybuff", "togepi", "tyrogue", "smoochum", "elekid", "magby", "azurill", "wynaut", "budew", "chingling", "bonsly", "happiny", "muchlax", "riolu", "mantyke", "toxel", "gible", "starly", "bulbasaur", "squirtle", "charmander", "buneary", "teddiursa", "eevee", "rufflet", "vullaby", "bounsweet", "stufful", "bidoof", "piplup", "patrat", "psyduck", "beldum", "abra", "caterpie", "aron", "axew", "porygon", "ralts", "spheal", "swinub", "lotad", "dratini", "trapinch", "magnemite", "lillipup"]
        let poke = pokemon[Math.floor(Math.random() * pokemon.length)]

        let url = `https://pokeapi.co/api/v2/pokemon/${poke}`
        await axios.get(url).then(function (response) {
            console.log(response.data.types)
            result = response.data
        })

        let type = result.types.map(r => {
            if (r !== r) re = r
            if (r === r) return
            return `${r.type.name}`
        }).join(' | ')

        let id_length = result.id.toString().length
        if (id_length === 1) {
            sprite = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${result.id}.png`
        } else if (id_length === 2) {
            sprite = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${result.id}.png`
        } else if (id_length === 3) {
            sprite = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${result.id}.png`
        }


        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const variv = randomIntFromInterval(1, 31) //(0, 31)
        const variv2 = randomIntFromInterval(1, 31) //(0, 31)
        const variv3 = randomIntFromInterval(1, 31) //(0, 31)
        const variv4 = randomIntFromInterval(1, 31) //(0, 31)
        const variv5 = randomIntFromInterval(1, 31) //(0, 31)
        const variv6 = randomIntFromInterval(1, 31) //(0, 31)

        let lvl = Math.floor(Math.random() * 4) + 1;

        let hp = Math.floor(Math.random() * 0) + variv;
        atk = Math.floor(Math.random() * 0) + variv2;
        def = Math.floor(Math.random() * 0) + variv3;
        spatk = Math.floor(Math.random() * 0) + variv4;
        spdef = Math.floor(Math.random() * 0) + variv5;
        speed = Math.floor(Math.random() * 0) + variv6;

        let xp = Math.floor(1.2 * lvl ^ 3) - (15 * lvl ^ 2) + (100 * lvl) - 140 + 52

        let totaliv = (((hp + atk + def + spatk + spdef + speed)) / 186) * 100
        let iv = totaliv.toFixed(2);

        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const shinyvar = randomIntFromInterval(1, 4000) //(70, 650)
        if (shinyvar > 3998) {
            var shiny = true
        }
        else {
            var shiny = false
        }
        //type = galarian
        gen = Math.floor(Math.random() * 16096);
        if (gen <= 10) shiny = true;


        let natures = ["Hardy", "Lonely", "Brave", "Adamant", "Naughty", "Docile", "Bold", "Relaxed", "Impish", "Lax", "Serious", "Timid", "Hasty", "Jolly", "Naive", "Bashful", "Modest", "Mild", "Quiet", "Rash", "Quirky", "Calm", "Gentle", "Sassy", "Careful"]

        let nature1 = natures[Math.floor(Math.random() * natures.length)]

        user.pokemons.push({
            level: lvl,
            xp: 0,
            name: poke,
            hp: hp,
            atk: atk,
            def: def,
            spatk: spatk,
            spdef: spdef,
            speed: speed,
            moves: [],
            shiny: shiny,
            rarity: type,
            nature: nature1,
            url: url,
            totalIV: iv

        })
        await user.markModified(`pokemons`)
        user.egg = user.egg - 1
        await user.save();
        // let imgname = 'hatch.png'
        let bg = `https://media.discordapp.net/attachments/878121517949550625/893304105672523837/pokemon-x-y-7-27-15__large.png?width=360&height=216`
        const background = await loadImage(bg)
        ctx.drawImage(background, 0, 0, 1192, 670)
        const pk = await loadImage(sprite)
        ctx.drawImage(pk, 300, 100, 550, 550)

        let embedx1 = new Discord.MessageEmbed()
          .setColor(`WHITE`)
          .setAuthor(`Congratulations ${interaction.user.username} your Egg hatched!`)
          .setDescription(`Welcome to the world, ${capitalize(poke)}!\n${(poke.shiny ? "This one looks special ✨" : "")}\nType \`.info latest\` to view it!`)
          .setImage("attachment://" + "hatch.png")
        return interaction.reply({
            embeds: [embedx1],
            files: [{ name: "hatch.png", attachment: canvas.toBuffer() }]
        })

    }
}