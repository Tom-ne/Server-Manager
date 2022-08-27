const serverManager = require('./ServerManager')

const { InteractionType, ContextMenuCommandBuilder } = require('discord.js')
const Discord = require('discord.js')

const { readdirSync } = require('fs')

/**
 * @param {Discord.Client} client 
 */
async function start(client) {
    client.commands = new Discord.Collection();

    // load events
    readdirSync('./src/events').forEach(dir => {
        const eventFiles = readdirSync(`./src/events/${dir}`).filter(file => file.endsWith(".js"));

        for(const file of eventFiles) {
            const event = require(`./events/${dir}/${file}`);

            if(!event.name) {
                return console.log(`Error from file src/events/${dir}/${file}, events must have a name!`)

            }

            if(event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    })

    // load commands
    const commands = [];

    readdirSync('./src/commands'.forEach(async(dir) => {
        const commandFiles = readdirSync(`./src/commands/${dir}/`).filter((files) => files.endsWith(".js"))

        for(const file of commandFiles) {
            const command = require(`./commands/${dir}/${file}`)

            commands.push(command)
        }
    }))
}