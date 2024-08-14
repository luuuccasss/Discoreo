
    // ============================== //
    // 🚀 Check out my GitHub: //
    // 👉 https://github.com/FrenchGuys //
    // ============================== //

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Displays information about the server.'),
    async execute(interaction) {
        const { guild } = interaction;

        try {
            const embed = new MessageEmbed()
                .setTitle(`${guild.name} Server Info`)
                .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
                .addFields(
                    { name: 'Server Name', value: guild.name, inline: true },
                    { name: 'Total Members', value: guild.memberCount.toString(), inline: true },
                    { name: 'Server Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
                    { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                    { name: 'Verification Level', value: guild.verificationLevel, inline: true }
                )
                .setColor('GREEN');

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ embeds: [embed] });
            } else if (interaction.deferred) {
                await interaction.followUp({ embeds: [embed] });
            }
        } catch (error) {
            console.error('Error executing serverinfo command:', error);

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            } else if (interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
};
