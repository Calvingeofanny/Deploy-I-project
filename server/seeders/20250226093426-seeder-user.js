'use strict';

const { hash } = require('../helpers/bcrypt');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const users = [
      {
        username: "calvingeofanny",
        email: "calvingeofanny@gmail.com",
        password: hash("123456"),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user",
        email: "user@gmail.com",
        password: hash("123456"),
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  }
};
