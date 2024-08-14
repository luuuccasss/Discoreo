
    // ============================== //
    // 🚀 Check out my GitHub: //
    // 👉 https://github.com/FrenchGuys //
    // ============================== //

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Displays information about a user.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User to get information about')
                .setRequired(false)),
    async execute(interaction) {
        try {
            const user = interaction.options.getUser('target') || interaction.user;
            const member = interaction.guild.members.cache.get(user.id);

            const embed = new MessageEmbed()
                .setTitle(`${user.username}'s Info`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .addFields(
                    { name: 'Username', value: user.tag, inline: true },
                    { name: 'ID', value: user.id, inline: true },
                    { 
                        name: 'Joined Server', 
                        value: member ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:D>` : 'N/A', 
                        inline: true 
                    },
                    { 
                        name: 'Account Created', 
                        value: `<t:${Math.floor(user.createdTimestamp / 1000)}:D>`, 
                        inline: true 
                    }
                )
                .setColor('BLUE');

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ embeds: [embed] });
            } else if (interaction.deferred) {
                await interaction.followUp({ embeds: [embed] });
            }
        } catch (error) {
            console.error('Error executing userinfo command:', error);

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            } else if (interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
};
