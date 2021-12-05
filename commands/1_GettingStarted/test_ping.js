const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test_ping')
        .setDescription('Checks if bot is online'),
    async execute(client, interaction) {
        await interaction.reply({
            content: 'I\'m online!',
            ephemeral: true
        })
    }
}