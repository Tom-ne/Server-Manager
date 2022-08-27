const guildSchema = require("../../schemas/guild/guildSchema");

module.exports = async function(guildId) {
    await new guildSchema({
        guildId: guildId,
        logsChannelId: "",
        verifyChannelId: "",
        suggestionChannelId: "",
        welcomeChannelId: "",

        staffRoleId: ""
    }).save();
}