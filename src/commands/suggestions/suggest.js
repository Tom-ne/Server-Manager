const { ActionRowBuilder } = require('@discordjs/builders');
const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ApplicationCommandOptionType,
    ChannelType,
    TextInputStyle,
    ThreadAutoArchiveDuration,
} = require('discord.js');
const Discord = require('discord.js');
const ms = require('ms');
const ServerManager = require('../../ServerManager');

module.exports = {
    name: "suggest",
    description: "make a suggestion",
    options: [],
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async(interaction ,client) => {
        const suggestionChannel = await ServerManager.database.getter.getSuggestionChannel(interaction.guild.id, client)
        if(!suggestionChannel) return interaction.reply({ content: "There isn't a suggestion channel configured", ephemeral: true })
        if(suggestionChannel.type != ChannelType.GuildForum) return interaction.reply({ content: "The suggestion channel must be a forum", ephemeral: true })
        const modal = new Discord.ModalBuilder()
            .setCustomId(`suggestion-${interaction.member.id}`)
            .setTitle("Suggestion")
        
        const suggestionInput = new Discord.TextInputBuilder()
            .setCustomId("suggestion")
            .setLabel("Suggestion")
            .setPlaceholder("Enter your suggestion here")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
        
        modal.addComponents(new ActionRowBuilder().addComponents(suggestionInput))

        await interaction.showModal(modal)

        const submitted = await interaction.awaitModalSubmit({
            time: ms("1h"),
            filter: i => i.user.id === interaction.user.id && i.customId === `suggestion-${interaction.member.id}`
        }).catch(error => {
            ServerManager.logger.consoleLogger.log(error, "err")
            return null
        })

        if(submitted) {
            submitted.reply({ content: "received", ephemeral: true })
            const suggestion = submitted.fields.getField("suggestion").value;

            const none = suggestionChannel.availableTags.find(tag => tag.name == 'waiting for review')

            const embed = new EmbedBuilder()
                .setTitle(`Suggestion by ${interaction.user.tag}`)
                .setDescription(suggestion)
                .setColor("Random")
                .setFooter({ text: "Suggestions system", iconURL: client.user.avatarURL() })
                .setTimestamp()

            await suggestionChannel.threads.create({
                name: `Suggestion by ${interaction.user.tag}`,
                autoArchiveDuration: ThreadAutoArchiveDuration.OneDay,
                message: {
                    embeds: [embed],
                },
                reason: 'New suggestion',
                appliedTags: [ none.id ]
            })
            .then(channel => {
                channel.lastMessage.react('⬆') 
                channel.lastMessage.react('⬇') 
            })
            .catch(error => ServerManager.logger.consoleLogger.log(error, "err"))
        }
    }
};