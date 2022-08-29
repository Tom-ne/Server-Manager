const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    ApplicationCommandOptionType
} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "kick members",
    options: [
        {
            name: 'user',
            description: "who's the member you wan to kick?",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "what is the reason for the kick?",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async(interaction, client) => {
        if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) {
            return await interaction.reply({ content: "you dont have a permission to this command!", ephemeral: true})
        }
        const user = await interaction.options.get("user");

        if(user.member.user.bot) {
            return await interaction.reply({ content: "i couldn't kick bots", ephemeral: true });
        }

        if(user.member.id === interaction.member.id) {
            return await interaction.reply({ content: "you can't kcik yourself", ephemeral: true })
        }

        if(user.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) || !user.member.manageable) {
            return await interaction.reply({ content: "i couldn't kick this member" })
        }

        const reason = await interaction.options.getString("סיבה")
        try {
            user.member.kick(reason) + 
            interaction.reply({content:`the user got kick`, ephemeral: true})

        } catch {
            console.error()
            return await interaction.reply({ content: "there was a problem and i couldn't kick this member", ephemeral: true })
        }
    }
}
;