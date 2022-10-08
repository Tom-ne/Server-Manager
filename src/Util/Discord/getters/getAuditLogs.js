const { AuditLogEvent, Guild } = require('discord.js')

/**
 * 
 * @param {Number} limit 
 * @param {AuditLogEvent} type 
 * @param {Guild} guild 
 */
module.exports = async function(limit, type, guild) {
    return await guild.fetchAuditLogs({
        limit: limit,
        type: type
    })
}