const {
	ActionRowBuilder,
	ButtonBuilder,
	EmbedBuilder,
	ApplicationCommandOptionType
} = require('discord.js');
const Discord = require('discord.js');
module.exports = {
	name: "clear",
	description: "delete up to 99 messages",
	options: [
		{
			name: "amount",
			description: "what id the amount of messages you want to delete?",
			type: ApplicationCommandOptionType.Integer,
			required: true
		},
		{
			name: "user",
			description: "a specific member you to delete his messages",
			type: ApplicationCommandOptionType.User,
			required: false
		}
	],
	/**
	 * @param {Discord.Client} client
	 * @param {Discord.CommandInteraction} interaction
	 */
	run: async(interaction ,client) => {
		if(!interaction.member.permissions.has("MANAGE_MESSAGES")) {
			return await interaction.reply({ content: "you don't have a permission to this command", ephemeral: true })
		}

		const amount = await interaction.options.get("amount").value;
		const target = await interaction.options.get("user");

		if(amount < 1 || amount > 99) {
			return await interaction.reply({ content: 'you need to choose a number 1 to 99', ephemeral: true });
		}

		if(!target) {
			await interaction.channel.bulkDelete(amount).catch(async(error) => {
				client.logger.log(`${error}`, "error")
				return await interaction.reply({ content: "i have a error, and i couldn't delete any message", ephemeral: true });
			});
			return await interaction.reply({ content: `\`${amount}\` messages had been deleted successfully!`, ephemeral: true });
		}


		try {
			interaction.channel.messages.fetch({
				limit: amount
			}).then(async (messages) => {
				const msgs = [];
				messages.filter(m => m.author.id === target.user.id).forEach(msg => msgs.push(msg))
				await interaction.channel.bulkDelete(msgs).then(async () => {
					await interaction.reply({ content: `\`${amount}\` messaged from <@${target.user.id}> has been deleted successfully!`, ephemeral: true })
				})
			})
		} catch(err) {
			client.logger.log(`${err}`, "error")
			return await interaction.reply({ content: "i have a error, and i couldn't delete any message", ephemeral: true });
		}

	}
};