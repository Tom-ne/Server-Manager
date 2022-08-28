const guildSchema = require("../../../schemas/guild/guildSchema");

module.exports = async function(guildId, logChannelId, verifyChannelId, suggestionChannelId, welcomeChannelId, staffRoleId) {
    await guildSchema.findOneAndUpdate({
        guildId: guildId
    }, {
        logChannelId: logChannelId,
        verifyChannelId: verifyChannelId,
        suggestionChannelId: suggestionChannelId,
        welcomeChannelId: welcomeChannelId,
        staffRoleId: staffRoleId
    }, { upsert: true })
}