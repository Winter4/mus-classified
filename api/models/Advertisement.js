const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Advertisement extends Model { }
  
  Advertisement.init(
    {
      id: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      headline: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      modelId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Advertisement",
    },
  );

  return Advertisement;
};