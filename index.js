
    // ============================== //
    // 🚀 Check out my GitHub: //
    // 👉 https://github.com/FrenchGuys //
    // ============================== //

const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.commands = new Collection();

// Print GitHub link function with enhanced visibility
function printGitHubLink() {
    console.log('\n==============================');
    console.log('🚀 Check out my GitHub:');
    console.log('👉 https://github.com/FrenchGuys');
    console.log('==============================\n');

}

// Load commands
const commandFolders = fs.readdirSync('./Commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./Commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
    }
}

// Load events
const eventFiles = fs.readdirSync('./Events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./Events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, (...args) => {
        console.log(`\nEvent triggered: ${eventName}`);
        printGitHubLink();  // Print GitHub link when an event is triggered
        event(client, ...args);
    });
}

// Log in the bot using the token from the config file
client.login(config.token)
    .then(() => {
        console.log('Bot logged in successfully.');
        printGitHubLink();  // Print GitHub link after the bot logs in
    })
    .catch(console.error);
