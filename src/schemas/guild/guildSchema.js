const mongoose = require('mongoose')

const guildSchema = mongoose.Schema({
    guildId: String,

    logChannelId: String,
    verifyChannelId: String,
    suggestionChannelId: String,
    welcomeChannelId: String,

    staffRoleId: String
})

module.exports = mongoose.model('guildConfig', guildSchema);