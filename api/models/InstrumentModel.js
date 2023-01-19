const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class InstrumentModel extends Model { 
    static associate({ Manufacturer, Advertisement }) {
      this.belongsTo(Manufacturer, { foreignKey: "manufacturerId", onDelete: "CASCADE" });
      this.hasMany(Advertisement, { foreignKey: "modelId", onDelete: "SET NULL" });
    }
  }
  
  InstrumentModel.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      manufacturerId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "InstrumentModel",
    },
  );

  return InstrumentModel;
};