const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, MessageAttachment, Collection } = require("discord.js");
const axios = require("axios")
const fs = require("fs");
const { classToPlain } = require("class-transformer");
const { getlength } = require("../../functions");
const Pokemon = require("./../../Classes/Pokemon");
let Fishspawn = require('../../models/fish.js')
let Guild = require('../../models/guild.js')
// let images = require('../../images')
const Canvas = require('canvas')
const canvas = Canvas.createCanvas(1192, 670);
const context = canvas.getContext('2d')
const {
    SlashCommandBuilder
} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fish')
        .setDescription('Hunt a wild pokemon every 5 minutes!'),
    async execute(client, interaction) {
        const message = interaction
        let names = ["alomomola", "basculin", "carvanha", "chinchou", "eelektrik", "eelektross", "feebas", "finneon", "goldeen", "gorebyss", "huntail", "lanturn", "luvdisc", "magikarp", "qwilfish", "seaking", "stunfisk", "tynamo", "relicanth", "horsea", "seadra", "remoraid", "octillery", "kingdra", "seadra", "tentacool", "tentacruel", "staryu", "starmie", "shellder", "cloyster", "clampearl", "corsola", "mantine", "seel", "dewgong", "spheal", "walrein", "sharpedo", "wailmer", "wailord", "bruxish", "arctovish", "dracovish", "psyduck", "dewgong", "golduck", "corphish", "crawdaunt", "krabby", "kingler", "alomomola", "basculin", "carvanha", "chinchou", "eelektrik", "eelektross", "feebas", "finneon", "goldeen", "gorebyss", "huntail", "lanturn", "luvdisc", "magikarp", "qwilfish", "seaking", "stunfisk", "tynamo", "relicanth", "horsea", "seadra", "remoraid", "octillery", "kingdra", "seadra", "tentacool", "tentacruel", "staryu", "starmie", "shellder", "cloyster", "clampearl", "corsola", "mantine", "seel", "dewgong", "spheal", "walrein", "sharpedo", "wailmer", "wailord", "bruxish", "arctovish", "dracovish", "psyduck", "dewgong", "golduck", "corphish", "crawdaunt", "krabby", "kingler", "alomomola", "basculin", "carvanha", "chinchou", "eelektrik", "eelektross", "feebas", "finneon", "goldeen", "gorebyss", "huntail", "lanturn", "luvdisc", "magikarp", "qwilfish", "seaking", "stunfisk", "tynamo", "relicanth", "horsea", "seadra", "remoraid", "octillery", "kingdra", "seadra", "tentacool", "tentacruel", "staryu", "starmie", "shellder", "cloyster", "clampearl", "corsola", "mantine", "seel", "dewgong", "spheal", "walrein", "sharpedo", "wailmer", "wailord", "bruxish", "arctovish", "dracovish", "psyduck", "dewgong", "golduck", "corphish", "crawdaunt", "krabby", "kingler", "alomomola", "basculin", "carvanha", "chinchou", "eelektrik", "eelektross", "feebas", "finneon", "goldeen", "gorebyss", "huntail", "lanturn", "luvdisc", "magikarp", "qwilfish", "seaking", "stunfisk", "tynamo", "relicanth", "horsea", "seadra", "remoraid", "octillery", "kingdra", "seadra", "tentacool", "tentacruel", "staryu", "starmie", "shelder", "cloyster", "clampearl", "corsola", "mantine", "seel", "dewgong", "spheal", "walrein", "sharpedo", "wailmer", "wailord", "bruxish", "arctovish", "dracovish", "psyduck", "dewgong", "golduck", "corphish", "crawdaunt", "krabby", "kingler", "alomomola", "basculin", "carvanha", "chinchou", "eelektrik", "eelektross", "feebas", "finneon", "goldeen", "gorebyss", "huntail", "lanturn", "luvdisc", "magikarp", "qwilfish", "seaking", "stunfisk", "tynamo", "relicanth", "horsea", "seadra", "remoraid", "octillery", "kingdra", "seadra", "tentacool", "tentacruel", "staryu", "starmie", "shellder", "cloyster", "clampearl", "corsola", "mantine", "seel", "dewgong", "spheal", "walrein", "sharpedo", "wailmer", "wailord", "bruxish", "arctovish", "dracovish", "psyduck", "dewgong", "golduck", "corphish", "crawdaunt", "krabby", "kingler", "alomomola", "basculin", "carvanha", "chinchou", "eelektrik", "eelektross", "feebas", "finneon", "goldeen", "gorebyss", "huntail", "lanturn", "luvdisc", "magikarp", "qwilfish", "seaking", "stunfisk", "tynamo", "relicanth", "horsea", "seadra", "remoraid", "octillery", "kingdra", "seadra", "tentacool", "tentacruel", "staryu", "starmie", "shellder", "cloyster", "clampearl", "corsola", "mantine", "seel", "dewgong", "spheal", "walrein", "sharpedo", "wailmer", "wailord", "bruxish", "arctovish", "psyduck", "dewgong", "golduck", "corphish", "crawdaunt", "krabby", "kingler", "alomomola", "basculin", "carvanha", "chinchou", "eelektrik", "eelektross", "feebas", "finneon", "goldeen", "gorebyss", "huntail", "lanturn", "luvdisc", "magikarp", "qwilfish", "seaking", "stunfisk", "tynamo", "relicanth", "horsea", "seadra", "remoraid", "octillery", "kingdra", "seadra", "tentacool", "tentacruel", "staryu", "starmie", "shellder", "cloyster", "clampearl", "corsola", "mantine", "dewgong", "spheal", "walrein", "sharpedo", "wailmer", "wailord", "bruxish", "arctovish", "dracovish", "psyduck", "dewgong", "golduck", "crawdaunt", "krabby", "kingler", "alomomola", "basculin", "carvanha", "chinchou", "eelektrik", "eelektross", "feebas", "finneon", "goldeen", "gorebyss", "huntail", "lanturn", "luvdisc", "magikarp", "qwilfish", "seaking", "stunfisk", "tynamo", "relicanth", "horsea", "seadra", "remoraid", "octillery", "kingdra", "seadra", "tentacool", "tentacruel", "staryu", "starmie", "shellder", "cloyster", "clampearl", "corsola", "mantine", "seel", "dewgong", "spheal", "walrein", "sharpedo", "wailmer", "wailord", "bruxish", "arctovish", "dracovish", "psyduck", "dewgong", "golduck", "corphish", "crawdaunt", "krabby", "kingler", "alomomola", "basculin", "carvanha", "chinchou", "eelektrik", "eelektross", "feebas", "finneon", "goldeen", "gorebyss", "huntail", "lanturn", "luvdisc", "magikarp", "qwilfish", "stunfisk", "tynamo", "relicanth", "horsea", "seadra", "remoraid", "kingdra", "seadra", "tentacool", "tentacruel", "staryu", "starmie", "shellder", "cloyster", "clampearl", "corsola", "mantine", "seel", "dewgong", "spheal", "walrein", "sharpedo", "wailmer", "wailord", "bruxish", "psyduck", "dewgong", "golduck", "corphish", "crawdaunt", "krabby", "kingler", "alomomola", "basculin", "carvanha", "chinchou", "eelektrik", "eelektross", "feebas", "finneon", "goldeen", "gorebyss", "huntail", "lanturn", "luvdisc", "magikarp", "qwilfish", "seaking", "stunfisk", "tynamo", "relicanth", "horsea", "seadra", "remoraid", "octillery", "kingdra", "seadra", "tentacool", "tentacruel", "staryu", "starmie", "shellder", "cloyster", "clampearl", "mantine", "seel", "dewgong", "spheal", "walrein", "sharpedo"]
        let name = names[Math.floor(Math.random() * names.length)]
        const sprite = `https://play.pokemonshowdown.com/sprites/xyani/${name}.gif`
        let shiny, id, data;
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`
        await axios.get(url).then(function (response) {
            // console.log(response.data);
            data = response.data;
        })

        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const shinyvar = randomIntFromInterval(1, 4000) //(70, 650)
        if (shinyvar > 3998) {
            shiny = true
        }
        else {
            shiny = false
        }
        gen = Math.floor(Math.random() * 16096);
        if (gen <= 10) shiny = true;
        let lvl = Math.floor(Math.random() * 69) + 1
        let pokemon = new Pokemon({ name: data.name.toLowerCase(), id: data.id, shiny: shiny, url: sprite }, lvl)
        pokemon = await classToPlain(pokemon)
        let imgname = 'fish.png'
        let netball = await Fishspawn.findOne({ id: message.channel.id })
        if (!netball) await new Fishspawn({ id: message.channel.id }).save();
        netball = await Fishspawn.findOne({ id: message.channel.id })
        netball.pokemon = []
        netball.pokemon.push(pokemon)
        netball.time = 259200000 + Date.now()
        await netball.save()
        console.log(images)


        // let bg = images.background.png; 
        // let fishrod = `../images/d8yja8e-08bf0fcf-d025-431d-8f43-.png`;
        // ;
        // function randomIntFromInterval(min, max) { // min and max included 
        //     return Math.floor(Math.random() * (max - min + 1) + min)
        // }
        // const varx = randomIntFromInterval(70, 650) //(70, 650)
        // const vary = randomIntFromInterval(80, 120) //(200, 320)
        // const varw = randomIntFromInterval(350, 520) //(350, 520)
        // const varh = varw //varh = varw
        // const background = await Canvas.loadImage(bg)
        // context.drawImage(background, 0, 0, canvas.width, canvas.height)
        // const pk = await Canvas.loadImage(pokemon.url)
        // context.globalCompositeOperation = 'source-atop';
        // context.drawImage(pk, varx, vary, varw, varh)
        // const fishingrod = await Canvas.loadImage(fishrod)
        // context.drawImage(fishingrod, 80, 470, 200, 200)
        // context.globalCompositeOperation = 'saturation';
        // context.fillStyle = "red";
        // context.globalAlpha = 1;  // alpha 0 = no effect 1 = full effect
        // context.fillStyle = "blue"; // `${fill}
        // context.globalAlpha = 1;  // alpha 0 = no effect 1 = full effect
        // context.fillRect(0, 0, canvas.width, canvas.height);
        // context.fillRect(0, 0, canvas.width, canvas.height);
        // const attachment = new MessageAttachment(canvas.toBuffer(), 'fish.png')
        // embedx = new Discord.MessageEmbed()
        //     .setAuthor(`A wild Pokémon is snagging your rod!`)
        //     .setDescription('Use `.reel <pokemon>` to capture it!')
        //     .setColor('#0077be')
        //     .setFooter('You can use this command again in 5 minutes')
        //     .setImage("attachment://fish.png")

        // interaction.reply({ embeds: [embedx], files: [attachment] })
        // return context.clearRect(0, 0, canvas.width, canvas.height);
        interaction.reply({
            content: 'check console'
        })
    }
}