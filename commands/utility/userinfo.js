const { EmbedBuilder } = require('discord.js');

module.exports = {
	// data: new SlashCommandBuilder()
	//     .setName('info')
	//     .setDescription('Replies with info about a user / guild')
    //     .addSubcommand(new SlashCommandSubcommandBuilder()
    //         .setName('user')
    //         .setDescription('Gets the info of a user')
    //         .addUserOption(option => option
    //             .setName('user')
    //             .setDescription('The user to get info about')
    //             .setRequired(false)
    //         )
    //     )
    //     .addSubcommand(new SlashCommandSubcommandBuilder()
    //         .setName('server')
    //         .setDescription('Gets the information about the server')
    //     ),
    data: {
        name: 'User Info',
        type: 2,
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },

	async execute(interaction) {
        const user = interaction.targetUser

        const embed = new EmbedBuilder()
            .setColor(Math.round(Math.random() * 0xFFFFFF))
            .setTitle(`${user.displayName}'s Info`)
            .setFooter({ text: 'Made by TheKillerBunny', iconURL: 'https://avatars.githubusercontent.com/u/69465699' })
            .setTimestamp(Date.now())
            .setDescription(`* username: ${user.username}\n* ID: ${user.id}\n* Bot: ${user.bot}\n* Created: ${user.createdAt.toString()}${user.avatar && `\n* Avatar URL: ${user.avatarURL()}` || ``}${user.avatarDecoration && `\n* Avatar Decoration URL: ${user.avatarDecorationURL()}` || ``}${user.banner && `\n* Banner URL: ${user.bannerURL()}` || ``}${user.accentColor && `\n* Accent Color: ${user.accentColor}` || ``}`)

        await interaction.reply({ embeds: [embed] });
	},
};
