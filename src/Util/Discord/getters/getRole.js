const Discord = require('discord.js')

/**
 * @param {String} roleId 
 * @param {String} guildId 
 * @param {Discord.Client} client 
 */
module.exports = async function(roleId, guildId, client) {
    const Guild = await client.guilds.cache.find(guild => guild.id === guildId);

    return await Guild.roles.cache.find(role => role.id === roleId)
}