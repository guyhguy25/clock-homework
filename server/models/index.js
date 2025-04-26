const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect,
    }
);

const User = require('./User')(sequelize);
const TimesheetReport = require('./TimesheetReport')(sequelize);

// Define associations
User.associate({ User, TimesheetReport });
TimesheetReport.associate({ User });

module.exports = {
    sequelize,
    User,
    TimesheetReport,
}; 