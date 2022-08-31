const getChannel = require('../../Discord/getters/getChannel')
const getGuild = require('./getGuild')

module.exports = async function(guildId, client) {
    const guildData = await getGuild(guildId)
    if(!guildData.logChannelId) return null;
    else {
        return await getChannel(guildData.logChannelId, guildId, client);
    }
}
