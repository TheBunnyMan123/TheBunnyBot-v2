const { EmbedBuilder, SlashCommandBuilder, SlashCommandSubcommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	    .setName('info')
	    .setDescription('Replies with info about a user / guild')
        .addSubcommand(new SlashCommandSubcommandBuilder()
            .setName('user')
            .setDescription('Gets the info of a user')
            .addUserOption(option => option
                .setName('user')
                .setDescription('The user to get info about')
                .setRequired(false)
            )
        )
        .addSubcommand(new SlashCommandSubcommandBuilder()
            .setName('server')
            .setDescription('Gets the information about the server')
        ),

	async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('user') ?? interaction.user

            const embed = new EmbedBuilder()
                .setColor(Math.round(Math.random() * 0xFFFFFF))
                .setTitle(`${user.displayName}'s Info`)
                .setFooter({ text: 'TheKillerBunny', iconURL: 'https://avatars.githubusercontent.com/u/69465699' })
                .setTimestamp(Date.now())
                .setDescription(`* username: ${user.username}\n* ID: ${user.id}${user.avatar && `\n* Avatar URL: ${user.avatarURL()}` || ``}${user.avatarDecoration && `\n* Avatar Decoration URL: ${user.avatarDecorationURL()}` || ``}${user.banner && `\n* Banner URL: ${user.bannerURL()}` || ``}`)
    
            await interaction.reply({ embeds: [embed] });
        }else if (interaction.options.getSubcommand() === 'server') {
            var guild = interaction.guild

            const embed = new EmbedBuilder()
                .setColor(Math.round(Math.random() * 0xFFFFFF))
                .setTitle(`${guild.name}'s Info`)
                .setFooter({ text: 'TheKillerBunny', iconURL: 'https://avatars.githubusercontent.com/u/69465699' })
                .setTimestamp(Date.now())
                .setDescription(`* ID: ${guild.id}${guild.description && `\n* Description: ${guild.description}` || ``}\n* Owner: <@${guild.ownerId}>${guild.afkChannel && `\n* AFK Channel: <#${guild.afkChannelId}>` || ``}${guild.afkChannel && `\n* AFK Channel: <#${guild.afkChannelId}>` || ``}${guild.icon && `\n* Icon: ${guild.iconURL()}` || ``}`)

		    await interaction.reply({ embeds: [embed] });
        }
	},
};
