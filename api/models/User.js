const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model { }
  
  User.init(
    {
      id: DataTypes.INTEGER,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    },
  );

  return User;
};