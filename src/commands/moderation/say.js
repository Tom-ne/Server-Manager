const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    ApplicationCommandOptionType,
    ChannelType
} = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: "say",
    description: "make the bot say something",
    type: ApplicationCommandOptionType.Subcommand,
    options: [
        {
            name: "message",
            description: "what you want the the bot will say?",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "room",
            description: "which channel you want?",
            type: ApplicationCommandOptionType.Channel,
            required: false
        }
    ],
       /**
     * @param {Discord.CommandInteraction} interaction 
     * @param {Discord.Client} client 
     */
        run: async(interaction, client) => {
            if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
                interaction.reply({ content: "**you don't have a permission to this command**", ephemeral: true })
            }

            var channel = await interaction.options.getChannel("room")
            var message = await interaction.options.getString('message')
    
            if(!channel) {
                channel = interaction.channel
            }
    
            if(channel.type === ChannelType.DM || channel.type === ChannelType.GuildVoice || channel.type === ChannelType.GuildStageVoice || channel.type === ChannelType.GuildCategory) {
                await interaction.reply({ content: "i cant send a message on the channel you pick", ephemeral: true })
            }
    
            await interaction.reply({ content: "okay", ephemeral: true })
    
            await channel.send(message)
        }
}