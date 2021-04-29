"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("challenges", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: { model: "users", key: "id" },
      },
      title: {
        type: Sequelize.STRING,
      },
      tag_name: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.TEXT,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("challenges");
  },
};
