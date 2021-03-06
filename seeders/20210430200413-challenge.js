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
      "challenges",
      [
        {
          user_id: 1,
          title: "finally I did",
          tag_name: "prove",
          body: "{content : breathing, date : today}",
        },
        {
          user_id: 2,
          title: "catch me if you can",
          tag_name: "prove",
          body: "{content : hacking, date : tomorrow}",
        },
        {
          user_id: 2,
          title: "I am bad person",
          tag_name: "brag",
          body: "{content : stoling, date : known}",
        },
        {
          user_id: 3,
          title: "coding god",
          tag_name: "coding",
          body: "{content : coding, date : whole life}",
        },
        {
          user_id: 2,
          title: "I am best",
          tag_name: "brag",
          body: "{content : appearance, date : 1year}",
        },
        {
          user_id: 3,
          title: "til",
          tag_name: "prove",
          body: "{content : coding, date : today}",
        },
        {
          user_id: 1,
          title: "I will be hired soon",
          tag_name: "expectation",
          body: "{content : studying, date : few months}",
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
    await queryInterface.bulkDelete("challenges", null, {});
  },
};
