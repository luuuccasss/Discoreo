
    // ============================== //
    // 🚀 Check out my GitHub: //
    // 👉 https://github.com/FrenchGuys //
    // ============================== //

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong and the bot\'s latency.'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pong!', fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = Math.round(interaction.client.ws.ping);

        await interaction.editReply(`Pong! Latency is ${latency}ms. API Latency is ${apiLatency}ms.`);
    }
};
