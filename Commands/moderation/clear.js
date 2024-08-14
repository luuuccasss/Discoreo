
    // ============================== //
    // 🚀 Check out my GitHub: //
    // 👉 https://github.com/FrenchGuys //
    // ============================== //

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears a specified number of messages in the channel.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to clear (between 1 and 100)')
                .setRequired(true)),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return interaction.reply({ content: 'You do not have permission to manage messages.', ephemeral: true });
        }

        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return interaction.reply({ content: 'I do not have permission to manage messages.', ephemeral: true });
        }

        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: 'Please provide a number between 1 and 100.', ephemeral: true });
        }

        try {
            const deletedMessages = await interaction.channel.bulkDelete(amount, true);

            if (deletedMessages.size === 0) {
                return interaction.reply({ content: 'No messages were deleted. They may be too old to delete (messages older than 14 days cannot be deleted).', ephemeral: true });
            }

            return interaction.reply({ content: `Successfully cleared ${deletedMessages.size} messages.`, ephemeral: true });

        } catch (error) {
            console.error('Error clearing messages:', error);
            return interaction.reply({ content: 'There was an error trying to clear messages in this channel.', ephemeral: true });
        }
    }
};
