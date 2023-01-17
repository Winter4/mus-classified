const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class AdImage extends Model { }
  
  AdImage.init(
    {
      id: DataTypes.INTEGER,
      adId: DataTypes.INTEGER,
      path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AdImage",
    },
  );

  return AdImage;
};