const { EmbedBuilder } = require('discord.js');

module.exports = {
	// data: new SlashCommandBuilder()
	// 	.setName('embed')
	// 	.setDescription('Replies with an embed')
    //     .addStringOption(option => option
    //         .setName('title')
    //         .setDescription('Embed title'))
    //     .addStringOption(option => option
    //         .setName('description')
    //         .setDescription('Embed description'))
    //     .addStringOption(option => option
    //         .setName('image')
    //         .setDescription('Embed image'))
    //     .addStringOption(option => option
    //         .setName('thumbnail')
    //         .setDescription('Embed thumbnail'))
    //     .addStringOption(option => option
    //         .setName('url')
    //         .setDescription('Embed url')),
    data: {
        name: 'embed',
        type: 1,
        description: 'Send an embed',
        options: [
            {
                type: 3,
                name: 'title',
                description: 'Embed Title',
                required: true,
            },
            {
                type: 3,
                name: 'description',
                description: 'Embed Description',
                required: true,
            },
            {
                type: 3,
                name: 'image',
                description: 'Embed Image',
                required: false,
            },
            {
                type: 3,
                name: 'thumbnail',
                description: 'Embed Thumbnail',
                required: false,
            },
            {
                type: 3,
                name: 'url',
                description: 'Embed URL',
                required: false,
            }

        ],
        integration_types: [0, 1],
        contexts: [0, 1, 2],
      },

	async execute(interaction) {
        const opts = interaction.options

		const embed = new EmbedBuilder()
            .setColor(Math.round(Math.random() * 0xFFFFFF))
            .setTitle(opts.getString('title'))
            .setFooter({ text: 'Made by TheKillerBunny', iconURL: 'https://avatars.githubusercontent.com/u/69465699' })
            .setDescription(opts.getString('description'))
            .setImage(opts.getString('image'))
            .setThumbnail(opts.getString('thumbnail'))
            .setURL(opts.getString('url'))
            .setTimestamp(Date.now())

        await interaction.reply({ embeds: [embed] });
	},
};
