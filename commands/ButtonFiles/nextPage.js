const Discord = require("discord.js");
const wait = require('util').promisify(setTimeout);
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
    name: 'nextPage',
    description: 'Go to the next page/embed',
    async execute(client, interaction) {

        const embed1 = new MessageEmbed()
            .setTitle("Nice to meet you " + interaction.user.username + "!")
            .setDescription(`**Welcome to the amazing world of Pokémon!**`
                + `\nPlease use the underlying buttons to navigate through the cut scenes and to start your Pokémon journey.`)
            .setImage("https://miro.medium.com/max/1024/0*88dsiW2nGkvVSMco")
            .setColor("YELLOW")
            .setFooter("Page 1 of 6")

        const embed2 = new MessageEmbed()
            .setTitle("What is Catchcord?")
            .setDescription(`Catchcord is a game bot designed where you can catch randomly spawned Pokémon in your servers and trade them to Pokémon Sword and Shield.`)
            .setImage("https://media.discordapp.net/attachments/878030078511050845/895051978823041104/unknown.png?width=305&height=242")
            .setColor("YELLOW")
            .setFooter("Page 2 of 6")

        const embed3 = new MessageEmbed()
            .setTitle("How can I trade my Pokémon to Sword and Shield?")
            .setDescription('[SysBot.NET](https://github.com/kwsch/SysBot.NET) is an open source project powered by PKHeX.Core that can automate certain Switch consoles.\nSelect your caught Pokémon, choose your move set using the `.moves` command, and then generate a showdown set using the `.showdown` command.')
            .setImage("https://media.discordapp.net/attachments/878030078511050845/895054215955755018/maxresdefault.png?width=759&height=427")
            .setColor("YELLOW")
            .setFooter("Page 3 of 6")

        const embed4 = new MessageEmbed()
            .setTitle("Are all Pokémon tradable?")
            .setDescription('No! This bot does not have any implemented legality checks. Some Pokémon you catch are shiny locked or an illegal level; for example, you can catch a level 2 shiny Zacian.\nThese Pokémon are only tradeable on a special LAN bot in our [home server](https://discord.gg/TwyCFr5WDY)\nOthers are completely impossible to get because they are not coded in the game, like the Sinnoh starters.\nYou can always legalize your Pokémon using the bots legalize command.')
            .setImage("https://media.discordapp.net/attachments/878030078511050845/895056103996538920/shiny-zacian-zamazenta.png?width=675&height=380")
            .setColor("YELLOW")
            .setFooter("Page 4 of 6")

        const embed5 = new MessageEmbed()
            .setTitle("Global Bot Rules!")
            .setDescription(`1. Do not trade assets (such as outside currency) outside of Discord bots for credits or Pokémon. Doing so will result in a permanent blacklist and/or an account reset.\n2. Using any form of bot or automation of human actions (such as an autoclicker or autospammer) will result in an instant and permanent blacklist. We are subject to reset your account as well. This rule includes any discussion of the aforementioned.\n3. We do not take any liability or account for your actions if you are scammed of any sort outside our official servers.\n4. Abusing the bot by spamming commands at any time is not permitted.`)
            .setColor("YELLOW")
            .setFooter("Page 5 of 6")

        const embed6 = new MessageEmbed()
            .setTitle("Getting Started!")
            .setDescription("Alright " + interaction.user.username + "! I think it's time for you to get your choose your starter Pokémon using the `.pick` command!\nA full list of my commands can be found using the `.help` command. If you find any bugs with the bot then please report in the [official Catchcord server](https://discord.gg/TwyCFr5WDY).")
            .setImage("https://media.discordapp.net/attachments/878030078511050845/895059331282776104/pokemon-omega-ruby-alpha-choose-your-starting-pokemon-gameplay-screenshot-3ds.png?width=576&height=427")
            .setColor("YELLOW")
            .setFooter("Page 6 of 6")

        const currentPage = parseInt(interaction.message.embeds[0].footer.text.slice(5,6))
        let pages = [embed1, embed2, embed3, embed4, embed5, embed6]


        if(interaction.isButton()) {
            let nextPage;
            if(currentPage === 6) {
                nextPage = 1
            } else {
                nextPage = currentPage + 1
            }
            const reqEmbed = pages[nextPage-1]
            console.log(reqEmbed)
            interaction.update({
                embeds: [reqEmbed]
            })
            await wait(20000)

            const disabledButtons = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('previousPage')
                        .setLabel('Previous')
                        .setStyle('SECONDARY')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId('nextPage')
                        .setLabel('Next')
                        .setStyle('SUCCESS')
                        .setDisabled(true),
                )
            interaction.editReply({
                embeds: [reqEmbed],
                components: [disabledButtons]
            })
        }
    }
}