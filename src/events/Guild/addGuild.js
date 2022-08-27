const { ChannelType } = require('discord.js');
const Discord = require('discord.js')
const ServerManager = require('../../ServerManager')

module.exports = {
    name: "guildCreate",
    /**
     * @param {Discord.Guild} guild 
     * @param {Discord.Client} client 
     */
    async execute(guild, client) {
        await ServerManager.database.addGuild(guild.id);

        const me = await guild.members.cache.find((user) => user.id === client.user.id)

        let defaultChannel;
        guild.channels.cache.forEach((channel) => {
            if(channel.type == ChannelType.GuildText && defaultChannel == "") {
                if(channel.permissionsFor(me).has("SendMessages")) {
                    defaultChannel = channel;
                }
            }
        })
        
        defaultChannel.send('Thanks for adding me to your server. please config me using the config command');
    }
}