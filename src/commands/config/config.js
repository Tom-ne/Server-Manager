const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ApplicationCommandOptionType,
} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: "config",
    description: "config the bot",
    options: [],
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async(interaction ,client) => {
        return interaction.reply({ content: "test", ephemeral: true })
    }
};