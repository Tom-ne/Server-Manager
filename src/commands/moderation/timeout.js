const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    ApplicationCommandOptionType
} = require('discord.js');
const Discord = require('discord.js');
const ms = require('ms');


module.exports = {
    name: "timeout",
    description: "mute members",
    options: [
        {
            name: 'user',
            description: "who's the member you want timeout?",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "what is the reason for the timeout?",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "time",
            description: "how much long you want mute the member?",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async (interaction, client) => {
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.timeout) 
        && !interaction.member.permissions.has(Discord.PermissionsBitField.Flags.MuteMembers)) {
            return await interaction.reply({ content: "you dont have a permission to this command", ephemeral: true})
        }
        const user = await interaction.options.get("user");

        if(user.member.user.bot) {
            return await interaction.reply({ content: "i couldn't give a mute to bots", ephemeral: true });
        }

        if(user.member.id === interaction.member.id) {
            return await interaction.reply({ content: "u can't mute yourself", ephemeral: true })
        }

        if(user.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator) || !user.member.manageable) {
            return await interaction.reply({ content: "i couldn't give a mute to this member" })
        }

        const reason = await interaction.options.getString("reason")
        const time = await interaction.options.get("time")

        try {
            await user.member.timeout(ms(time), reason);
            await interaction.reply({ content: 'the member has been muted successfully', ephemeral: false })
        } catch {
            console.error();
            return await interaction.reply({ content: "there was a problem and i could't mute this member", ephemeral: true })
        }

    }
};