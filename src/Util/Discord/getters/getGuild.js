const Discord = require('discord.js')

/**
 * @param {String} guildId 
 * @param {Discord.Client} client 
 */
module.exports = async function(guildId, client) {
    const Guild = await client.guilds.cache.get(guildId)
    return Guild
}