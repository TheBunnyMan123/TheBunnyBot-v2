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
        name: 'serverinfo',
        description: 'Gets information about the server',
        type: 1,
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },

	async execute(interaction) {
        var guild = interaction.guild

        if (guild != null) {
            const embed = new EmbedBuilder()
                .setColor(Math.round(Math.random() * 0xFFFFFF))
                .setTitle(`${guild.name}'s Info`)
                .setFooter({ text: 'Made by TheKillerBunny', iconURL: 'https://avatars.githubusercontent.com/u/69465699' })
                .setTimestamp(Date.now())
                .setDescription(`* ID: ${guild.id}${guild.description && `\n* Description: ${guild.description}` || ``}\n* Owner: <@${guild.ownerId}>\n* Created: ${guild.createdAt.toString()}\n* Member Count: ${guild.memberCount}${guild.afkChannel && `\n* AFK Channel: <#${guild.afkChannelId}>` || ``}${guild.afkChannel && `\n* AFK Channel: <#${guild.afkChannelId}>` || ``}${guild.icon && `\n* Icon: ${guild.iconURL()}` || ``}${guild.banner && `\n* Banner: ${guild.bannerURL()}` || ``}`)

		    await interaction.reply({ embeds: [embed] });
        }else {
            await interaction.reply('tf just happened, i\'m not in a guild for some reason')
        }
	},
};
