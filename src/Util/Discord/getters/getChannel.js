const Discord = require('discord.js')

/**
 * @param {String} channelId 
 * @param {String} guildId 
 * @param {Discord.Client} client 
 */
module.exports = async function(channelId, guildId, client) {
    const Guild = await client.guilds.cache.find(guild => guild.id === guildId);

    return await Guild.channels.cache.get(channelId);
}