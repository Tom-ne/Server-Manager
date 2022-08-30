const {
    ButtonStyle,
    ActionRowBuilder,
    EmbedBuilder,
    ButtonBuilder
} = require('discord.js');
const Discord = require('discord.js');
const { getCommands } = require('../../bot');

module.exports = {
    name: 'help',
    description: 'מראה לך את כל הפקודות שהינך יכול להשתמש בהן',
    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    run: async (interaction, client) => {

        const regularEMB = new EmbedBuilder()
            .setColor("DarkGold")
            .setTitle(`${interaction.member.user.username}, שלום לך!`)
            .setDescription("ברוך הבא לתפריט העזרה של הבוט!")
            .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))


        const membersBtn = new ButtonBuilder()
            .setCustomId('members')
            .setLabel("Members")
            .setStyle(ButtonStyle.Primary)

        const staffBtn = new ButtonBuilder()
            .setCustomId('staff')
            .setLabel("Staff")
            .setStyle(ButtonStyle.Primary)

        const highStaffBtn = new ButtonBuilder()
            .setCustomId('highstaff')
            .setLabel("High Staff")
            .setStyle(ButtonStyle.Primary)

        const ownerBtn = new ButtonBuilder()
            .setCustomId('owner')
            .setLabel("Owner")
            .setStyle(ButtonStyle.Primary)

        var Btn;

        if (interaction.member.roles.cache.some(role => role.id === "your member role id")) {
            Btn = new ActionRowBuilder()
                .addComponents(
                    membersBtn,
                    staffBtn.setDisabled(true),
                    highStaffBtn.setDisabled(true),
                    ownerBtn.setDisabled(true)
                )
        }else if (interaction.member.roles.cache.some(role => role.id === "your staff role id")) {
            Btn = new ActionRowBuilder()
                .addComponents(
                    membersBtn,
                    staffBtn,
                    highStaffBtn.setDisabled(true),
                    ownerBtn.setDisabled(true)
                )
        }else if (interaction.member.roles.cache.some(role => role.id === "your staff role id")) {
            Btn = new ActionRowBuilder()
                .addComponents(
                    membersBtn,
                    staffBtn,
                    highStaffBtn.setDisabled(true),
                    ownerBtn.setDisabled(true)
                )
        }else if (interaction.member.roles.cache.some(role => role.id === "your high staff role id")) {
            Btn = new ActionRowBuilder()
                .addComponents(
                    membersBtn,
                    staffBtn,
                    highStaffBtn,
                    ownerBtn.setDisabled(true)
                )
        }else if (interaction.member.roles.cache.some(role => role.id === "your owner role id")) {
            Btn = new ActionRowBuilder()
                .addComponents(
                    membersBtn,
                    staffBtn,
                    highStaffBtn,
                    ownerBtn
                )
        }

        interaction.reply({ content: `${interaction.member}`, embeds: [regularEMB], components: [Btn] })

        const collector = interaction.channel.createMessageComponentCollector({
            filter: (b) => {
                if(b.member.user.id === interaction.member.id) return true
                else {
                    b.reply({ content: "this is not your menu", ephemeral: true })
                }
            },
            time: 60000,
            idle: 60000 / 2
        });

        
        collector.on("end", async() => {
            await interaction.editReply({
                components:[
                    new ActionRowBuilder().addComponents(
                        membersBtn.setDisabled(true),
                        staffBtn.setDisabled(true),
                        highStaffBtn.setDisabled(true),
                        ownerBtn.setDisabled(true)
                    )
                ]
            }).catch(() => {})
        })

        collector.on('collect', async(b) => {
            if(b.customId === 'members') {
                const commands = getCommands("Member", client)

                const memberEmb = new EmbedBuilder()
                .setColor("DarkAqua")
                .setTitle(`hey ${interaction.member.user.username}!`)
                .setDescription("members commands!")
                .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
                if((await commands).length !== 0) {
                    ;(await commands).forEach(async(cmd) => {
                        memberEmb.addFields(
                            { name: `/${cmd.name}`, value: cmd.description }
                        )
                    })
                } else {
                    memberEmb.addFields(
                        { name: `commands`, value: "there is no commands to this category" }
                    )
                }
                interaction.editReply({ content: `${interaction.member}`, embeds: [memberEmb] })
            }

            if(b.customId === 'staff') {
                const commands = getCommands("staff", client)

                const staffEmb = new EmbedBuilder()
                .setColor("DarkAqua")
                .setTitle(`hey ${interaction.member.user.username}!`)
                .setDescription("staff commands!")
                .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
                if((await commands).length !== 0) {
                    ;(await commands).forEach(async(cmd) => {
                        staffEmb.addFields(
                            { name: `/${cmd.name}`, value: cmd.description }
                        )
                    })
                } else {
                    staffEmb.addFields(
                        { name: `commands`, value: "there is no commands to this category" }
                    )
                }
                interaction.editReply({ content: `${interaction.member}`, embeds: [staffEmb] })
            }

            if(b.customId === 'highstaff') {
                const commands = getCommands("high staff", client)

                const highStaffEmb = new EmbedBuilder()
                .setColor("DarkAqua")
                .setTitle(`hey ${interaction.member.user.username}!`)
                .setDescription("high staff commands!")
                .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
                if((await commands).length !== 0) {
                    ;(await commands).forEach(async(cmd) => {
                        highStaffEmb.addFields(
                            { name: `/${cmd.name}`, value: cmd.description }
                        )
                    })
                } else {
                    highStaffEmb.addFields(
                        { name: `commands`, value: "there is no commands to this category" }
                    )
                }
                interaction.editReply({ content: `${interaction.member}`, embeds: [highStaffEmb] })
            }

            if(b.customId === 'owner') {
                const commands = getCommands("owner", client)

                const ownerEmb = new EmbedBuilder()
                .setColor("DarkAqua")
                .setTitle(`hey ${interaction.member.user.username}!`)
                .setDescription("owner commands!")
                .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
                if((await commands).length !== 0) {
                    ;(await commands).forEach(async(cmd) => {
                        ownerEmb.addFields(
                            { name: `/${cmd.name}`, value: cmd.description }
                        )
                    })
                } else {
                    ownerEmb.addFields(
                        { name: `commands`, value: "there is no commands to this category" }
                    )
                }
                interaction.editReply({ content: `${interaction.member}`, embeds: [ownerEmb] })
            }

        })
    }
}