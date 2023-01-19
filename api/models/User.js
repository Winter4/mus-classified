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
      password: { type: DataTypes.STRING, allowNull: false },
      phoneNumber: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
    },
  );

  return User;
};