const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class AdImage extends Model { 
    static associate({ Advertisement }) {
      this.belongsTo(Advertisement, { foreignKey: "adId", onDelete: "CASCADE" });
    }
  }
  
  AdImage.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      adId: { type: DataTypes.INTEGER, allowNull: false },
      path: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "AdImage",
    },
  );

  return AdImage;
};