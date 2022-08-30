const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    ApplicationCommandOptionType
} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: "server",
    description: "Displays information about the server",
    options: [],
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async(interaction, client) => {
        const serverrrrr = new EmbedBuilder()
        .setColor('CYAN')
        .addFields(
            { name: "__**Channels** __:", value: `${client.channels.cache.size}`, inline: true },
            { name: "__**Servers**__ :", value: `${client.guilds.cache.size}`, inline: true },
            { name: "__**Users**__ :", value: `${client.users.cache.size}`, inline: true }
        )
        await interaction.reply({content: ` ${interaction.member}`, embeds: [ serverrrrr ]});
    }
};