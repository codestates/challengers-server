"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: "user_id", targetKey: "id" });
      this.belongsTo(models.user, {
        foreignKey: "follow_id",
        targetKey: "id",
      });
    }
  }
  user_user.init(
    {
      user_id: DataTypes.INTEGER,
      follow_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "user_user",
    }
  );
  return user_user;
};
