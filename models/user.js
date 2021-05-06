"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.challenge, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      this.hasMany(models.pinlist, { foreignKey: "user_id", sourceKey: "id" });
      this.hasMany(models.like, { foreignKey: "user_id", sourceKey: "id" });
      this.hasMany(models.user_user, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      this.hasMany(models.user_user, {
        foreignKey: "follow_id",
        sourceKey: "id",
      });
    }
  }
  user.init(
    {
      user_id: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "user",
    }
  );
  return user;
};
