
    // ============================== //
    // 🚀 Check out my GitHub: //
    // 👉 https://github.com/FrenchGuys //
    // ============================== //

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Displays the avatar of a user.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User to display the avatar of')
                .setRequired(false)),
    async execute(interaction) {
        try {
            const user = interaction.options.getUser('target') || interaction.user;
            const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

            const embed = new MessageEmbed()
                .setTitle(`${user.username}'s Avatar`)
                .setImage(avatarURL)
                .setColor('RANDOM') 
                .setFooter({
                    text: `Requested by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                });

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Error executing avatar command:', error);

            if (!interaction.replied) {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                try {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } catch (followUpError) {
                    console.error('Error sending follow-up message:', followUpError);
                }
            }
        }
    }
};
