import path from 'path';
import winston from 'winston';
import winstonRotate from 'winston-daily-rotate-file';

const logFilePath = path.join(__dirname, '../../logs/app.log');

const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}] ${message}`;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),

    // Rotate file daily
    new winstonRotate({
      filename: logFilePath,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),

    new winston.transports.File({
      filename: logFilePath,
      level: 'info',
    }),
  ],
});


export default logger;
