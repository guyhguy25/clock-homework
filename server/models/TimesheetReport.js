const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TimesheetReport = sequelize.define('TimesheetReport', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
      defaultValue: 'Pending',
    },
  });

  TimesheetReport.associate = models => {
    TimesheetReport.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'employee',
    });
  };

  return TimesheetReport;
};