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
        name: 'quote',
        type: 3,
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },

	async execute(interaction) {
        let message = interaction.targetMessage;
        let author = message.author;

        await interaction.reply(`\`\`\`\n${message.content.replaceAll('```', '`\u200b`\u200b`')}\n\`\`\`\n   -${author.displayName} (${author.username})`);
	},
};
