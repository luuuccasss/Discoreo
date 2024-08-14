
    // ============================== //
    // 🚀 Check out my GitHub: //
    // 👉 https://github.com/FrenchGuys //
    // ============================== //

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('panel')
        .setDescription('Displays a panel with buttons and a dropdown menu.'),
    async execute(interaction) {
        const button1 = new MessageButton()
            .setCustomId('button1')
            .setLabel('Button 1')
            .setStyle('PRIMARY');

        const button2 = new MessageButton()
            .setCustomId('button2')
            .setLabel('Button 2')
            .setStyle('SECONDARY');

        const selectMenu = new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Choose an option...')
            .addOptions([
                { label: 'Option 1', description: 'This is the first option', value: 'option1' },
                { label: 'Option 2', description: 'This is the second option', value: 'option2' }
            ]);

        const row1 = new MessageActionRow().addComponents(button1, button2);
        const row2 = new MessageActionRow().addComponents(selectMenu);

        await interaction.reply({ content: 'Here is your panel:', components: [row1, row2] });

        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            try {
                if (i.isButton()) {
                    if (!i.replied && !i.deferred) {
                        await i.deferUpdate();
                    }
                    const selectedButtonLabel = i.component.label;
                    await i.followUp({ content: `You clicked ${selectedButtonLabel}.`, ephemeral: true });
                } else if (i.isSelectMenu()) {
                    if (!i.replied && !i.deferred) {
                        await i.deferUpdate();
                    }
                    const selectedLabel = i.component.options.find(option => option.value === i.values[0]).label;
                    await i.followUp({ content: `You selected ${selectedLabel}.`, ephemeral: true });
                }
            } catch (error) {
                console.error('Error handling interaction:', error);
                if (!i.replied && !i.deferred) {
                    await i.followUp({ content: 'There was an error handling your interaction.', ephemeral: true });
                }
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.followUp({ content: 'No interactions were made within the time limit.', components: [] });
            }
        });
    }
};
