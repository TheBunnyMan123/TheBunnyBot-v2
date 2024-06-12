const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rawtext')
		.setDescription('Replies with the raw text of your input (no backticks please)')
        .addStringOption(option => option
            .setName('text')
            .setDescription('Sends the raw text')
            .setRequired(true)
        ),
	async execute(interaction) {
		const embed = new EmbedBuilder()
            .setColor(Math.round(Math.random() * 16777215))
            .setTitle('Raw Text')
            .setFooter({ text: 'TheKillerBunny', iconURL: 'https://avatars.githubusercontent.com/u/69465699' })
            .setTimestamp(Date.now())
            .setDescription(`\`${interaction.options.getString('text')}\``)

        await interaction.reply({ embeds: [embed] });
	},
};
