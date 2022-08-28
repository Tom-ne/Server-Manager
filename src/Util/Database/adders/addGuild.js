const guildSchema = require("../../../schemas/guild/guildSchema");

module.exports = async function(guildId) {
    await new guildSchema({
        guildId: guildId,
        logsChannelId: null,
        verifyChannelId: null,
        suggestionChannelId: null,
        welcomeChannelId: null,

        staffRoleId: null
    }).save();
}