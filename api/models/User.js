const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model { 
    static associate({ Advertisement }) {
      this.hasMany(Advertisement, { foreignKey: "userId", onDelete: "CASCADE" });
    }
  }
  
  User.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING(60), allowNull: false },
      phoneNumber: { type: DataTypes.STRING(30), allowNull: false },
      firstName: { type: DataTypes.STRING(100), allowNull: false },
      lastName: { type: DataTypes.STRING(100), allowNull: false },
      city: { type: DataTypes.STRING(50), allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
    },
  );

  return User;
};