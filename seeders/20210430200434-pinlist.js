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
      "pinlists",
      [
        {
          user_id: 1,
          challenge_id: 2,
        },
        {
          user_id: 1,
          challenge_id: 3,
        },
        {
          user_id: 2,
          challenge_id: 1,
        },
        {
          user_id: 2,
          challenge_id: 4,
        },
        {
          user_id: 3,
          challenge_id: 1,
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
    await queryInterface.bulkDelete("pinlists", null, {});
  },
};
