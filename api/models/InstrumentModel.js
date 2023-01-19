const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class InstrumentModel extends Model { 
    static associate({ Manufacturer }) {
      this.belongsTo(Manufacturer, { foreignKey: "manufacturerId" });
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