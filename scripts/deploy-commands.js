import { REST, Routes } from 'discord.js';
import { env } from '../src/config/env.js';
import { loadCommands } from '../src/loaders/commandLoader.js';
import { WB } from '../src/services/logger.js';

const { commandData } = await loadCommands();

const rest = new REST({ version: '10' }).setToken(env.token);

(async () => {
  try {
    WB.info(`Registering ${commandData.length} slash commands...`);

    await rest.put(
      Routes.applicationGuildCommands(env.clientId, env.guildId),
      { body: commandData }
    );

    WB.info(`${commandData.length} slash commands registered.`);
  } catch (error) {
    WB.error('Error registering slash commands', error);
  }
})();
