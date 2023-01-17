const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Message extends Model { }
  
  Message.init(
    {
      id: DataTypes.INTEGER,
      from: DataTypes.INTEGER,
      to: DataTypes.INTEGER,
      text: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Message",
    },
  );

  return Message;
};