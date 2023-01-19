import winston from 'winston';
const { combine, json, timestamp } = winston.format;

const errorFilter = winston.format((info, opts) => {
  return info.level === 'error' ? info : false;
})
const infoFilter = winston.format((info, opts) => {
  return info.level === 'info' ? info : false;
})
const debugFilter = winston.format((info, opts) => {
  return info.level === 'debug' ? info : false;
})

export const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    // Error Log
    new winston.transports.File({ filename: './logs/app-error.log', level: 'error', format: combine(errorFilter(),timestamp(), json()),}),
    // Messages log
    new winston.transports.File({ filename: './logs/app-info.log', level: 'info', format: combine(infoFilter(), timestamp(), json()),}),
    // MemberCount, Actions Log
    new winston.transports.File({ filename: './logs/app-debug.log', level: 'debug', format: combine(debugFilter(), timestamp(), json()),}),
  ],
  exitOnError: false
});

