const Discord = require('discord.js')
const {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    ButtonStyle,
} = require('discord.js');


module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Discord.Message} message 
     * @param {Discord.Client} client 
     */
    async execute(message, client) {
        if(message.author.bot) return;
        if(message.channel.type === Discord.ChannelType.DM) return; 

        const prefix = "!";
        const args = message.content.slice(prefix.length + 1).split(/ +/);
        
        if(message.content.startsWith("!h")) {
            var voiceChannel = message.member.voice.channel || " ``not in a voice`` "
                let staff = "you'r staff role id"
                let highStaff = "your high staff role id"
                let reason = args.slice(0).join(" ") || " ``there is a no reason``"
            
            var Embed = new Discord.EmbedBuilder()
            .setColor("CYAN")
            .setThumbnail(message.author.displayAvatarURL({ dynmic: true }))
            .addFields(
                { name: "__user__", value: `${message.author}`, inline: true},
                { name: "__role staff__", value: `<@&${staff}> <@&${highStaff}>`, inline: true},
                { name: "__reason__", value: `${reason}`,inline: true },
                { name: "__voice channel__", value: `${voiceChannel}`, inline: true}
            )
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()


            message.reply({content: `<@&${staff}> <@&${highStaff}>`, embeds: [ Embed ]})
        }
    }
}