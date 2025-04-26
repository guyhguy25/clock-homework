require('dotenv').config();

module.exports = {
    development: {
        username: process.env.MYSQL_USER || 'user',
        password: process.env.MYSQL_PASSWORD || 'password',
        database: process.env.MYSQL_DATABASE || 'mdclone',
        host: process.env.MYSQL_HOST_IP || 'mysql',
        dialect: 'mysql',
    },
    test: {
        username: process.env.MYSQL_USER || 'user',
        password: process.env.MYSQL_PASSWORD || 'password',
        database: process.env.MYSQL_DATABASE || 'mdclone',
        host: process.env.MYSQL_HOST_IP || 'mysql',
        dialect: 'mysql',
    },
    production: {
        username: process.env.MYSQL_USER || 'user',
        password: process.env.MYSQL_PASSWORD || 'password',
        database: process.env.MYSQL_DATABASE || 'mdclone',
        host: process.env.MYSQL_HOST_IP || 'mysql',
        dialect: 'mysql',
    },
}; 