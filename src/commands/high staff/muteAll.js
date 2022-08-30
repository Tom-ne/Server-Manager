const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ApplicationCommandOptionType,
} = require('discord.js');
const Discord = require('discord.js');
const ServerManager = require('../../ServerManager')

module.exports = {
    name: "mute-all",
    description: "mute all members in your voice channel",
    options: [],
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async(interaction ,client) => {
        const guildData = await ServerManager.database.getGuild(interaction.guild.id);

        if(!guildData.staffRoleId) {
            return interaction.reply({ content: "Staff role is not defined, please config the bot using the config command", ephemeral: true });
        }

        if(!interaction.member.roles.cache.has(guildData.staffRoleId)) {
            return interaction.reply({ content: "You don't have permission to use this command!", ephemeral: true })
        }

        if(!interaction.member.voice.channel) {
            return interaction.reply({ content: "You need to be in a voice to use this command!", ephemeral: true })
        }

        const voiceChannel = await ServerManager.discord.getChannel(interaction.member.voice.channel.id, interaction.guild.id, client);

        voiceChannel.members.forEach(member => {
            if(!member.roles.cache.has(guildData.staffRoleId)) {
                ServerManager.discord.voiceMute(member.id, interaction.guild.id, client).catch(err => client.logger.log(err, "error"));   
            }
        })

        interaction.reply({ content: "I have muted everyone that is not staff in your voice channel!", ephemeral: true })
    }
};