const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes, Client, Events, GatewayIntentBits, Collection, SlashCommandBuilder } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.username} (${readyClient.user.id})`);
})

client.commands = new Collection();

// eslint-disable-next-line no-undef
const commandFolderPath = path.join(__dirname, 'commands');
const commandsFolder = fs.readdirSync(commandFolderPath);
let commands = [];

for (const folder of commandsFolder) {
    const commandsPath = path.join(commandFolderPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);

			if (command.data instanceof SlashCommandBuilder) {
				commands.push(command.data.toJSON());
			} else {
				commands.push(command.data);
			}
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const rest = new REST().setToken(token);

// (async () => {
//     await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
// 	    .then(() => console.log('Successfully deleted all guild commands.'))
// 	    .catch(console.error);

//     await rest.put(Routes.applicationCommands(clientId), { body: [] })
// 	    .then(() => console.log('Successfully deleted all application commands.'))
// 	    .catch(console.error);

// 	try {
// 		console.log(`Started refreshing ${commands.length} application (/) commands.`);

//         // Register commands in test guild
// 		await rest.put(
// 			Routes.applicationGuildCommands(clientId, guildId),
// 			{ body: commands },
// 		);

//         // Register commands globally
//         const data = await rest.put(
//             Routes.applicationCommands(clientId),
//             { body: commands },
//         );

// 		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
// 	} catch (error) {
// 		console.error(error);
// 	}
// })();

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand() && !interaction.isMessageContextMenuCommand() && !interaction.isUserContextMenuCommand()) {
        return;
    }

	// console.log(interaction);

    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(token);
