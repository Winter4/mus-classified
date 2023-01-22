const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Image extends Model { 
    static associate({ Advertisement, AdImage }) {
      this.belongsToMany(Advertisement, { through: AdImage, foreignKey: "imageId", onDelete: "CASCADE" });
    }
  }
  
  Image.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      path: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Image",
    },
  );

  return Image;
};