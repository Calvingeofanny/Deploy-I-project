"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Order, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email already taken",
        },
        validate: {
          notNull: {
            msg: "Email required",
          },
          notEmpty: {
            msg: "Email required",
          },
          isEmail: {
            args: true,
            msg: "Must be email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password required",
          },
          notEmpty: {
            msg: "Password required",
          },
          len: {
            args: 5,
            msg: "Password minimum 5 characters",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    user.username = user.username.toLowerCase();
    user.email = user.email.toLowerCase();
    user.password = hash(user.password);
  });

  return User;
};
