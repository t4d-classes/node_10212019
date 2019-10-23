'use strict';

const winston = require('winston');

const createAppServer = require('./app');

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'info.log', level: 'info' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

createAppServer().listen(3000, () => {
  logger.log({
    level: 'info',
    message: 'web server started on port 3000'
  });
});