const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with "Pong!"'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
            .setColor(Math.round(Math.random() * 16777215))
            .setTitle('Pong!')
            .setFooter({ text: 'Made by TheKillerBunny', iconURL: 'https://avatars.githubusercontent.com/u/69465699' })
            .setTimestamp(Date.now())

        await interaction.reply({ embeds: [embed] });
	},
};
