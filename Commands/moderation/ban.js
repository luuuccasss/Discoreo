
    // ============================== //
    // 🚀 Check out my GitHub: //
    // 👉 https://github.com/FrenchGuys //
    // ============================== //

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the server.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for banning')
                .setRequired(false)),
    async execute(interaction) {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!target) {
            return interaction.reply({ content: 'The specified user is not a member of this server.', ephemeral: true });
        }

        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return interaction.reply({ content: 'You do not have permission to ban members.', ephemeral: true });
        }

        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return interaction.reply({ content: 'I do not have permission to ban members.', ephemeral: true });
        }

        if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) {
            return interaction.reply({ content: 'I cannot ban this member because their role is higher or equal to mine.', ephemeral: true });
        }

        if (target.id === interaction.user.id) {
            return interaction.reply({ content: 'You cannot ban yourself.', ephemeral: true });
        }

        if (target.id === interaction.guild.me.id) {
            return interaction.reply({ content: 'I cannot ban myself.', ephemeral: true });
        }

        try {
            await target.ban({ reason });
            return interaction.reply({ content: `${target.user.tag} has been banned for: ${reason}` });
        } catch (error) {
            console.error('Error banning member:', error);
            return interaction.reply({ content: 'An error occurred while trying to ban the member.', ephemeral: true });
        }
    }
};
