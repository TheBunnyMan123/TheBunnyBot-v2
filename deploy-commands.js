const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const {tabletojson} = require('tabletojson');

const commands = [];

// eslint-disable-next-line no-undef
const commandFolderPath = path.join(__dirname, 'commands');
const commandsFolder = fs.readdirSync(commandFolderPath);

for (const folder of commandsFolder) {
    const commandsPath = path.join(commandFolderPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON && command.data.toJSON() || tabletojson.convert(command.data));
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const rest = new REST().setToken(token);

(async () => {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	    .then(() => console.log('Successfully deleted all guild commands.'))
	    .catch(console.error);

    await rest.put(Routes.applicationCommands(clientId), { body: [] })
	    .then(() => console.log('Successfully deleted all application commands.'))
	    .catch(console.error);

	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // Register commands in test guild
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

        // Register commands globally
        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
