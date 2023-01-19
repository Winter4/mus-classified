const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Advertisement extends Model { 
    static associate({ User, Category, InstrumentModel, AdImage }) {
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(Category, { foreignKey: "categoryId" });
      this.belongsTo(InstrumentModel, { foreignKey: "modelId" });
      this.hasMany(AdImage, { foreignKey: "adId", onDelete: "CASCADE" });
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
    },
    {
      sequelize,
      modelName: "Advertisement",
    },
  );

  return Advertisement;
};