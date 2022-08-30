const serverManager = require('./ServerManager')

const { InteractionType, ContextMenuCommandBuilder, SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js')
const { readdirSync } = require('fs');
const mongoose = require('mongoose');

const { token, testGuildId, clientId, mongoPath } = require('./config.json');

/**
 * @param {Discord.Client} client 
 */
async function start(client) {
    client.commands = new Discord.Collection();
    client.logger = serverManager.logger.consoleLogger

    const dbOptions = {
        useNewUrlParser: true,
        autoIndex: false,
        connectTimeoutMS: 10000,
        family: 4,
        useUnifiedTopology: true,
    };
    await mongoose.connect(mongoPath, dbOptions);

    mongoose.Promise = global.Promise;
    mongoose.connection.on('connected', () => {
        client.logger.log("DATABASE CONNECTED", "db")
    })
    mongoose.connection.on('err', (err) => {
        client.logger.log(`Mongoose connection error: \n ${err.stack}`, "db")
    });
    mongoose.connection.on('disconnected', () => {
        client.logger.log(`Mongoose disconnected`, 'db')
    });
    
    // load events
    readdirSync("./src/events").forEach(dir => {
        const eventFiles = readdirSync(`./src/events/${dir}`).filter(file => file.endsWith(".js"))

        for(const file of eventFiles) {
            const event = require(`./events/${dir}/${file}`)

            client.logger.log(`${dir} Event Loaded: ${file.split(".")[0]}`, "event")
            if(event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    })

    // load commands
    const data = {};
    const commands = [];


    readdirSync('./src/commands').forEach(async (dir) => {
        const commandFiles = readdirSync(`./src/commands/${dir}/`).filter((files) => files.endsWith(".js"))

        for (const file of commandFiles) {
            const command = require(`./commands/${dir}/${file}`)
            if (!command.name) return client.logger.log(`Error from ${file}, commands must have a name`, "error")
            if (!command.description) return client.logger.log(`Error from ${file}, commands must have a description`, "error")

            client.commands.set(command.name, command);
            client.logger.log(`${dir} Slash Command Loaded: ${command.name}`, "cmd")
            data[command.name] = command;
            commands.push(command)
        }
    })

    client.on('interactionCreate', async (interaction) => {
        if(interaction.isSelectMenu()) {
            return;
        } else if(interaction.type === InteractionType.ApplicationCommand) {
            let cmd = data[interaction.commandName]
            if(cmd) {
                cmd.run(interaction, client)
            }
        }
        if(interaction.isContextMenuCommand()) {
            return;
        }
    });

    client.on("ready", async() => {
        await client.guilds.cache.get(testGuildId).commands.set(commands);
        await client.application.commands.set(commands);
    });

    client.login(token)
}

module.exports = { start }