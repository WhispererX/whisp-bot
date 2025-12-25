import Database from 'better-sqlite3';
import fs from 'fs';

fs.mkdirSync('data', { recursive: true });

export const db = new Database('data/bot.sqlite');

db.pragma('journal_mode = WAL');

db.prepare(`
  CREATE TABLE IF NOT EXISTS guilds (
    id TEXT PRIMARY KEY
  )
`).run();
