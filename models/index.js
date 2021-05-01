"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const challenges = require("./challenge");
const likes = require("./like");
const pinlists = require("./pinlist");
const users = require("./user");
const user_users = require("./user_user");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

//실제 db속 테이블의 이름값을 입력해야 함(sequelize로 생성시 복수로 이름 생성됨)
//해당 명령어를 통해 모델과 실제 데이터베이스가 연결됨

db.users = users;
// user.init(sequelize);

db.challenges = challenges;
// challenge.init(sequelize);

db.pinlists = pinlists;
// pinlist.init(sequelize);

db.likes = likes;
// like.init(sequelize);

db.user_users = user_users;
// user_user.init(sequelize);

module.exports = db;
