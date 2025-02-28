"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Category, { foreignKey: "CategoryId" });
    }
  }
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title required",
          },
          notEmpty: {
            msg: "Title required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Author required",
          },
          notEmpty: {
            msg: "Author required",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image required",
          },
          notEmpty: {
            msg: "Image required",
          },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category required",
          },
          notEmpty: {
            msg: "Category required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
