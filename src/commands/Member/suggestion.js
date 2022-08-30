const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    ApplicationCommandOptionType
} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: "suggestion",
    description: "suggest a suggestion",
    options: [
        {
            name: "suggest",
            description: "what is your suggestion?",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async(interaction ,client) => {
        var suggestion, suggestionChannel;
        var suggestionChannelId = '(your suggestion id)';

        await interaction.reply({content: "thank you fot the suggestion", ephemeral: true});
        suggestion = await interaction.options.get("suggest").value
        

        suggestionChannel = await client.channels.fetch(suggestionChannelId)


        const embbeed = new EmbedBuilder()
        .setTitle('__**new suggestion!**__')
        .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
        .setDescription(suggestion)
		await suggestionChannel.send({ embeds: [embbeed] }).then(function (message){
            message.react('✅');
            message.react('❌');
        });
    }
};