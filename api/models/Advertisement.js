const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Advertisement extends Model { 
    static associate({ User, Category, InstrumentModel, Image, AdImage }) {
      this.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
      this.belongsTo(Category, { foreignKey: "categoryId", onDelete: "SET NULL" });
      this.belongsTo(InstrumentModel, { foreignKey: "modelId", onDelete: "SET NULL" });
      this.belongsToMany(Image, { through: AdImage, foreignKey: "adId", onDelete: "CASCADE" });
    }
  }
  
  Advertisement.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      headline: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      categoryId: { type: DataTypes.INTEGER, allowNull: true },
      modelId: { type: DataTypes.INTEGER, allowNull: true },
      moderStatus: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      moderReason: { type: DataTypes.STRING, allowNull: true },
      expertStatus: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      expertReview: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName: "Advertisement",
    },
  );

  return Advertisement;
};