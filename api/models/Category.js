const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Category extends Model { }
  
  Category.init(
    {
      id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    },
  );

  return Category;
};