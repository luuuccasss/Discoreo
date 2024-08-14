
    // ============================== //
    // 🚀 Check out my GitHub: //
    // 👉 https://github.com/FrenchGuys //
    // ============================== //

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user from the server.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User to kick')
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getMember('target');

        if (!target) {
            return interaction.reply({ content: 'The specified user is not a member of this server.', ephemeral: true });
        }

        if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            return interaction.reply({ content: 'You do not have permission to kick members.', ephemeral: true });
        }

        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            return interaction.reply({ content: 'I do not have permission to kick members.', ephemeral: true });
        }

        if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) {
            return interaction.reply({ content: 'I cannot kick this member because their role is higher or equal to mine.', ephemeral: true });
        }

        if (target.id === interaction.user.id) {
            return interaction.reply({ content: 'You cannot kick yourself.', ephemeral: true });
        }

        if (target.id === interaction.guild.me.id) {
            return interaction.reply({ content: 'I cannot kick myself.', ephemeral: true });
        }

        try {
            await target.kick();
            return interaction.reply({ content: `${target.user.tag} has been kicked.` });
        } catch (error) {
            console.error('Error kicking member:', error);
            return interaction.reply({ content: 'An error occurred while trying to kick the member.', ephemeral: true });
        }
    }
};
