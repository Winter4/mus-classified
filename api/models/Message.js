const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Message extends Model { 
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "fromId", onDelete: "CASCADE" });
      this.belongsTo(User, { foreignKey: "toId", onDelete: "CASCADE" });
    }
  }
  
  Message.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      fromId: { type: DataTypes.INTEGER, allowNull: false },
      toId: { type: DataTypes.INTEGER, allowNull: false },
      text: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Message",
    },
  );

  return Message;
};