const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ApplicationCommandOptionType,
} = require('discord.js');
const Discord = require('discord.js');
const ServerManager = require('../../ServerManager')

module.exports = {
    name: "add-guild",
    description: "add a guild to the db",
    options: [],
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async(interaction ,client) => {
        await ServerManager.database.addGuild(interaction.guild.id);

        console.log(await ServerManager.database.getGuild(interaction.guild.id))
    }
};