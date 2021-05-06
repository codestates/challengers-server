"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class challenge extends Model {
    //테이블간 연결 설정
    static associate(models) {
      //챌린지 : 유저 = 1 : N
      //유저 테이블의 id가 pk, 챌린지 테이블의 user_id가 fk
      this.belongsTo(models.user, {
        foreignKey: "user_id",
        targetKey: "id",
      });
      //챌린지 : 핀 리스트 = 1 : N
      //챌린지의 id가 pk, 핀 리스트의 challenge_id가 fk
      this.hasMany(models.pinlist, {
        foreignKey: "challenge_id",
        sourceKey: "id",
      });
      this.hasMany(models.like, {
        foreignKey: "challenge_id",
        sourceKey: "id",
      });
    }
  }
  challenge.init(
    {
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      tag_name: DataTypes.STRING,
      body: DataTypes.STRING,
    },
    {
      sequelize,
      //createdAt 같은 시간에 관련된 기본적이 컬럼을 무시
      timestamps: false,
      modelName: "challenge",
    }
  );
  return challenge;
};
