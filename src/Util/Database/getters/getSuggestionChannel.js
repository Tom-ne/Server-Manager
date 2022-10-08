const Discord = require('discord.js')
const getChannel = require('../../Discord/getters/getChannel')
const getGuild = require('./getGuild')

/**
 * @param {String} guildId 
 * @param {Discord.Client} client 
 */
module.exports = async function(guildId, client) {
    const guildData = await getGuild(guildId)
    if(!guildData.suggestionChannelId) return null;
    else {
        return await getChannel(guildData.suggestionChannelId, guildId, client);
    }
}
