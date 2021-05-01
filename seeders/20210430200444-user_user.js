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
      "user_users",
      [
        {
          user_id: 1,
          follow_id: 3,
        },
        {
          user_id: 2,
          follow_id: 1,
        },
        {
          user_id: 2,
          follow_id: 3,
        },
        {
          user_id: 3,
          follow_id: 2,
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
    await queryInterface.bulkDelete("user_users", null, {});
  },
};
