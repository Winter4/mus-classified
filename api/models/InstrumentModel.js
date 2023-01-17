const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class InstrumentModel extends Model { }
  
  InstrumentModel.init(
    {
      id: DataTypes.INTEGER,
      manufacturerId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "InstrumentModel",
    },
  );

  return InstrumentModel;
};