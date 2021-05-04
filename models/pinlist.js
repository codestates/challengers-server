"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pinlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: "user_id", targetKey: "id" });
      this.belongsTo(models.challenge, {
        foreignKey: "challenge_id",
        targetKey: "id",
      });
    }
  }
  pinlist.init(
    {
      user_id: DataTypes.INTEGER,
      challenge_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "pinlist",
    }
  );
  return pinlist;
};
