const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class AdImage extends Model {}
  
  AdImage.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      adId: { type: DataTypes.INTEGER, allowNull: false },
      imageId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "AdImage",
    },
  );

  return AdImage;
};