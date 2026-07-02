import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        // Simpan error ke file
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),
        // Simpan semua log ke file
        new winston.transports.File({
            filename: 'logs/combined.log'
        }),
    ]
});

if (process.env.APP_ENV === 'development') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

export default logger;