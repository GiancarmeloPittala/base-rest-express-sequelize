const logger = require('../router/utils/logger')

require('dotenv').config()

module.exports =  {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mariadb',
    logger: console.log,
    // logging: 0
  }
