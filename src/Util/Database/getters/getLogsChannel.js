const ServerManager = require('../../../ServerManager')

module.exports = async function(guildId, client) {
    const guildData = await ServerManager.database.getter.getGuild(guildId)
    if(!guildData.logChannelId) return null;
    else {
        return await ServerManager.discord.getters.getChannel(guildData.logChannelId, guildId, client);
    }
}
