const Discord = require('discord.js')
const getGuild = require('./getGuild')
/**
 * @param {String} memberId 
 * @param {String} guildId 
 * @param {Discord.Client} client 
 */
module.exports = async function(memberId, guildId, client) {
    const Guild = await getGuild(guildId, client);

    const member = await Guild.members.cache.find(member => member.id === memberId);

    member.voice.setMute(true);
}