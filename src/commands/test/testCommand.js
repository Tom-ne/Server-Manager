const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ApplicationCommandOptionType,
} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: "test",
    description: "test command",
    options: [],
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async(interaction ,client) => {
        interaction.reply({ content: "this works", ephemeral: true })
    }
};