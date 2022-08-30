const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ApplicationCommandOptionType,
    ChannelType,
} = require('discord.js');
const Discord = require('discord.js');
const ServerManager = require('../../ServerManager')

module.exports = {
    name: "config",
    description: "config the bot",
    options: [
        {
            name: "log-channel",
            description: "please mention the logs channel",
            type: ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: "verify-channel",
            description: "please mention the verify channel",
            type: ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: "suggestion-channel",
            description: "please mention the suggestion channel",
            type: ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: "welcome-channel",
            description: "please mention the welcome channel",
            type: ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: "staff-role",
            description: "please mention the staff role",
            type: ApplicationCommandOptionType.Role,
            required: true
        }
    ],
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async(interaction ,client) => {
        if(!interaction.member.permissions.has("Administrator")) {
            return interaction.reply({ content: "You don't have permission to use this command, please ask an admin", ephemeral: true })
        }

        const staffRole = await interaction.options.get("staff-role").role
        
        const channels = [await interaction.options.get("log-channel").channel, await interaction.options.get("verify-channel").channel, await interaction.options.get("suggestion-channel").channel,
                          await interaction.options.get("welcome-channel").channel]

        channels.forEach(channel => {
            if(channel.type !== ChannelType.GuildText) return interaction.reply({ content: "you need to select a text channel!", ephemeral: true })
        })

        await ServerManager.database.editor.editGuild(interaction.guild.id, channels[0].id, channels[1].id, channels[2].id, channels[3].id, staffRole.id)

        const configEmbed = new EmbedBuilder()
            .setTitle("Config")
            .addFields(
                { name: "logs channel", value: `<#${channels[0].id}>`, inline: true },
                { name: "verify channel", value: `<#${channels[1].id}>`, inline: true },
                { name: "suggestion channel", value: `<#${channels[2].id}>`, inline: true },
                { name: "welcome channel", value: `<#${channels[3].id}>`, inline: true },
                { name: "staff role", value: `<@&${staffRole.id}>`, inline: true },
            )
            .setColor("Random")
            .setFooter({ text: "Config system", iconURL: client.user.avatarURL() })
            .setTimestamp()

        interaction.reply({ embeds: [configEmbed], ephemeral: true })
                        
    }
};