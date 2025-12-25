import winston from 'winston'; 
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const logDir = 'logs';
fs.mkdirSync(logDir, { recursive: true });

const levelColors = {
    info: chalk.blue,
    warn: chalk.yellow,
    error: chalk.red,
    debug: chalk.grey,
}

const consoleFormat = winston.format.printf(({ level, message, timestamp }) => {
    const color = levelColors[level] || ((text) => text);
    return color(`[${timestamp}] [${level.toUpperCase()}]: ${message}`);
});

const fileFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
});

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.timestamp(),
    transports: [
        new winston.transports.Console({
            format: consoleFormat,
        }),
        new winston.transports.File({
            filename: path.join(logDir, 'whisp-bot.log'),
            format: fileFormat,
        }),
    ],
});

export const WB = {
    info: (msg) => logger.info(msg),
    warn: (msg) => logger.warn(msg),
    error: (msg, err) => {
        logger.error(msg);
        if (err) logger.error(err.stack || err.toString());
    },
    debug: (msg) => logger.debug(msg),
}