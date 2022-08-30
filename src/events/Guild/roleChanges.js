const ServerManager = require('../../ServerManager')
const Discord = require('discord.js')

module.exports = {
    name: "guildMemberUpdate",
    /**
     * @param {Discord.GuildMember} oldUser 
     * @param {Discord.GuildMember} newUser 
     * @param {Discord.Client} client 
     */
    async execute(oldUser, newUser, client) {
        if(oldUser.roles === newUser.roles) return

        var oldRoles = " "
        var newRoles = " "
        oldUser.roles.cache.forEach(role => {
            oldRoles += `<@&${role.id}> `
        })
        newUser.roles.cache.forEach(role => {
            newRoles += `<@&${role.id}> `
        })

        console.log(oldRoles, newRoles)

        const logEmbed = new Discord.EmbedBuilder()
            .setTitle(`Member Role Change`)
            .setDescription(`**Old Roles:** ${oldRoles} \n\n **New Roles:** ${newRoles}`)
            .setColor("Random")
            .setFooter({ text: "Logs system", iconURL: client.user.avatarURL() })
            .setTimestamp()

        ServerManager.logger.discordLogger(oldUser.guild.id, logEmbed, client)
    }
}
