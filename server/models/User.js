const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: DataTypes.ENUM('Employee', 'Manager'),
  });

  User.associate = models => {
    User.belongsTo(models.User, { as: 'manager', foreignKey: 'managerId' });
    User.hasMany(models.User, { as: 'subordinates', foreignKey: 'managerId' });
    User.hasMany(models.TimesheetReport, { foreignKey: 'userId' });
  };

  return User;
};
