const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Checks if bot is online'),
    async execute(client, interaction) {
        await interaction.reply({
            content: `Pong! my ping is ${client.ws.ping}`,
            ephemeral: true
        })
    }
}