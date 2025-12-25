import fs from 'fs';
import path from 'path';
import { WB } from '../services/logger.js';

export async function loadCommands() {
  const commands = new Map();
  const commandData = [];

  const basePath = path.resolve('src/commands');

  for (const folder of fs.readdirSync(basePath)) {
    const folderPath = path.join(basePath, folder);
    const stats = fs.statSync(folderPath);

    if (!stats.isDirectory()) {
      continue;
    }

    try {
      const module = await import(`../commands/${folder}/${folder}.command.js`);
      const { command } = module;

      if (!command) {
        WB.warn(`Warning: No command export found in ${folder}/${folder}.command.js`);
        continue;
      }

      commands.set(command.data.name, command);
      commandData.push(command.data.toJSON());
    } catch (error) {
      WB.warn(`Warning: Failed to load command from ${folder}/${folder}.command.js: ${error.message}`);
    }
  }

  return { commands, commandData };
}
