const ServerManager = require('../../ServerManager')
const Discord = require('discord.js');
const { AuditLogEvent } = require('discord.js');

module.exports = {
    name: "messageDelete",
    /**
     * @param {Discord.Message} message 
     * @param {Discord.Client} client 
     */
    async execute(message, client) {
        if (!message.guild) return;

        const fetchedLogs = await ServerManager.discord.getters.getAuditLogs(1, AuditLogEvent.MessageDelete)

        const deletionLogs = fetchedLogs.entries.first();

        var embed;
        if (!deletionLogs) {
            embed = new Discord.EmbedBuilder()
                .setTitle("Message Deleted")
                .setDescription(`A message by <@${message.author.id}> was deleted`)
                .addFields(
                    { name: "content", value: message.content },
                    { name: "channel", value: `<#${message.channel.id}>` }
                )
                .setColor("Random")
                .setFooter({ text: "Logs system", iconURL: client.user.avatarURL() })
                .setTimestamp()
        } else {
            const { executor, target } = deletionLogs;
            if (target.id === message.author.id) {
                embed = new Discord.EmbedBuilder()
                    .setTitle("Message Deleted")
                    .setDescription(`A message by <@${message.author.id}> was deleted by <@${executor.id}>`)
                    .addFields(
                        { name: "content", value: message.content },
                        { name: "channel", value: `<#${message.channel.id}>` }
                    )
                    .setColor("Random")
                    .setFooter({ text: "Logs system", iconURL: client.user.avatarURL() })
                    .setTimestamp()
            } else {
                embed = new Discord.EmbedBuilder()
                    .setTitle("Message Deleted")
                    .setDescription(`A message by <@${message.author.id}> was deleted`)
                    .addFields(
                        { name: "content", value: message.content },
                        { name: "channel", value: `<#${message.channel.id}>` }
                    )
                    .setColor("Random")
                    .setFooter({ text: "Logs system", iconURL: client.user.avatarURL() })
                    .setTimestamp()
            }
        }

        ServerManager.logger.discordLogger(message.guild.id, embed, client);
    }
}
