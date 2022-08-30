const ServerManager = require('../../ServerManager')
const Discord = require('discord.js')

/**
 * @param {String} guildId 
 * @param {Discord.Embed} embed
 * @param {Discord.Client} client
 */
module.exports = async function(guildId, embed, client) {
    const logsChannel = await ServerManager.database.getter.getLogsChannel(guildId, client);
    if(!logsChannel) return;

    logsChannel.send({ embeds: [embed] })
}
