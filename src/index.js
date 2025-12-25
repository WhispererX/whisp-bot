import { client } from './client.js';
import { env } from './config/env.js';
import { loadCommands } from './loaders/commandLoader.js';
import interactionHandler from './events/interactionCreate.js';
import { WB } from './services/logger.js';

const { commands, commandData } = await loadCommands();

client.once('clientReady', () => {
  WB.info(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', i =>
  interactionHandler(i, commands)
);

await client.login(env.token);
