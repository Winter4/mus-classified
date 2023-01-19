const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Manufacturer extends Model { 
    static associate({ InstrumentModel }) {
      this.hasMany(InstrumentModel, { foreignKey: "manufacturerId", onDelete: "CASCADE" });
    }
  }
  
  Manufacturer.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Manufacturer",
    },
  );

  return Manufacturer;
};