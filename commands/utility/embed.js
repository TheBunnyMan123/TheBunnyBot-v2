const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Replies with an embed')
        .addStringOption(option => option
            .setName('title')
            .setDescription('Embed title'))
        .addStringOption(option => option
            .setName('description')
            .setDescription('Embed description'))
        .addStringOption(option => option
            .setName('image')
            .setDescription('Embed image'))
        .addStringOption(option => option
            .setName('thumbnail')
            .setDescription('Embed thumbnail'))
        .addStringOption(option => option
            .setName('url')
            .setDescription('Embed url')),

	async execute(interaction) {
        const opts = interaction.options

		const embed = new EmbedBuilder()
            .setColor(Math.round(Math.random() * 0xFFFFFF))
            .setTitle(opts.getString('title'))
            .setFooter({ text: 'TheKillerBunny', iconURL: 'https://avatars.githubusercontent.com/u/69465699' })
            .setDescription(opts.getString('description'))
            .setImage(opts.getString('image'))
            .setThumbnail(opts.getString('thumbnail'))
            .setURL(opts.getString('url'))
            .setTimestamp(Date.now())

        await interaction.reply({ embeds: [embed] });
	},
};
