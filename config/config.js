require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "challengers_development",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "challengers_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "challengers",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};