const { Client, GatewayIntentBits, Partials } = require('discord.js')
const bot = require('./src/bot')

const client = new Client({ intents: [Object.keys(GatewayIntentBits)] })

bot.start(client)