const { Events, GatewayIntentBits, Client, REST, Routes, SlashCommandBuilder } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.username} (${readyClient.user.id})`);
})

