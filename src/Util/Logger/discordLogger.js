const getLogsChannel = require('../Database/getters/getLogsChannel')
const Discord = require('discord.js')

/**
 * @param {String} guildId 
 * @param {Discord.Embed} embed
 * @param {Discord.Client} client
 */
module.exports = async function(guildId, embed, client) {
    const logsChannel = await getLogsChannel(guildId, client)
    if(!logsChannel) return;

    logsChannel.send({ embeds: [embed] })
}
