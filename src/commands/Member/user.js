const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    ApplicationCommandOptionType
} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: "user",
    description: "display information about user",
    options: [
        {
            name: "member",
            description: "who's the user you want to see information about?",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async (interaction, client) => {
        const user = await interaction.options.get("member");

        if (!user) {
            var userInfo1 = new EmbedBuilder()
                .setColor("CYAN")
                .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: "__user__", value: `${interaction.member.user.username}`, inline: true },
                    { name: "__userID__", value: `${interaction.member.id}`, inline: true },
                    { name: "__tag__", value: `${interaction.member.user.tag}`, inline: true }
                )
                .setFooter({ text: `${interaction.member.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
            interaction.reply({ content: '** **', embeds: [userInfo1] })
        } else {
            var userInfo2 = new EmbedBuilder()
                .setColor("CYAN")
                .setThumbnail(user.member.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: "__user__", value: `${user.member.user.username}`, inline: true },
                    { name: "__userID__", value: `${user.member.id}`, inline: true },
                    { name: "__tag__", value: `${user.member.user.tag}`, inline: true }
                )
                .setFooter({ text: `${user.member.tag}`, iconURL: user.member.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
            interaction.reply({ content: '** **', embeds: [[userInfo2]] })
        }

    }
};