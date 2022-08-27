const Discord = require('discord.js')

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Discord.Client} client 
     */
    async execute(client) {
        client.logger.log(`Connected as ${client.user.tag}`, "ready")
    }
}