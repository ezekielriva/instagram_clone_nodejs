import winston from "winston";

var transports:winston.transport[] = [];

if (process.env.NODE_ENV !== 'production') {
  transports = [
    new winston.transports.Console({ format: winston.format.simple() })
  ];
}

if (process.env.NODE_ENV === 'production') {
  transports = [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ]
}

const logger:winston.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: transports,
  });

  

  export default logger;