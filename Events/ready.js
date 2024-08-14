
    // ============================== //
    // 🚀 Check out my GitHub: //
    // 👉 https://github.com/FrenchGuys //
    // ============================== //

const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const config = require('../config.json');

module.exports = async (client) => {
    console.log(`Logged in as ${client.user.tag}`);

    // List of statuses to cycle through
    const statuses = [
        { type: 'PLAYING', text: 'with Discord.js' },
        { type: 'WATCHING', text: 'github.gg/FrenchGuys' },
        { type: 'LISTENING', text: 'for commands' },
        { type: 'STREAMING', text: 'Live on Discord!' }
    ];

    const setRandomStatus = async () => {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        try {
            await client.user.setActivity(status.text, { type: status.type });
            console.log(`Status set to: ${status.text}`);
        } catch (error) {
            console.error('Error setting status:', error);
        }
    };

    await setRandomStatus();

    setInterval(() => setRandomStatus(), 60 * 1000); // 60 seconds in milliseconds

    try {
        const guild = client.guilds.cache.get(config.guildId);
        if (!guild) throw new Error('Guild not found.');

        await guild.commands.set(client.commands.map(cmd => cmd.data.toJSON()));
        console.log(`Commands deployed successfully.`);
    } catch (error) {
        console.error('Error during command deployment:', error);
    }
};
