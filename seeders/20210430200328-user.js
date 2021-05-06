"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          user_id: "kimcoding",
          password: "1234",
          email: "kimcoding@abcd.com",
        },
        {
          user_id: "parkhacker",
          password: "mejor",
          email: "hackP@anonymous.com",
        },
        {
          user_id: "jh",
          password: "todo",
          email: "jh@admin.com",
        },
        {
          user_id: "abc",
          password: "123456",
          email: "abc@admin.com",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
