const {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    ButtonStyle,
    ApplicationCommandOptionType
} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "banned members",
    options: [
        {
            name: 'user',
            description: "who's the member you wan to ban?",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "what is thew reason for the ban?",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "time",
            description: "how much long you want to give for the member ban?",
            type: ApplicationCommandOptionType.String,
            required: true
        } 
    ],
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async(interaction, client) => {
        if(!interaction.member.permissions.has("BAN_MEMBERS")) {
            return await interaction.reply({ content: "you dont have a permmision to this command", ephemeral: true})
        }
        const user = await interaction.options.get("user");

        if(user.member.user.bot) {
            return await interaction.reply({ content: "i couldn't give a ban to bots", ephemeral: true });
        }

        if(user.member.id === interaction.member.id) {
            return await interaction.reply({ content: "u can't ban yourself", ephemeral: true })
        }

        if(user.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) || !user.member.manageable) {
            return await interaction.reply({ content: "i couldn't give a ban to this member" })
        }

        const reason = await interaction.options.getString("reason")
        const time = await interaction.options.get("time")

        try {
            user.member.ban((ms(time.value)), reason) + 
            interaction.reply({content: 'the user has been banned!'})
            
            
        } catch {
            console.error()
            return await interaction.reply({ content: "there was a problem and i could't ban this member", ephemeral: true })
        }
    }
}
;