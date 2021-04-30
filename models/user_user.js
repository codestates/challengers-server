'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_user.init({
    user_id: DataTypes.INTEGER,
    follow_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_user',
  });
  return user_user;
};