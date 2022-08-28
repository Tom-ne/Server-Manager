const guildSchema = require("../../../schemas/guild/guildSchema");

module.exports = async function(guildId) {
    return await guildSchema.findOne({ guildId: guildId });
}