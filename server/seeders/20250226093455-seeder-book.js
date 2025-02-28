'use strict';

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
    const books = [
      {
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        image: "https://upload.wikimedia.org/wikipedia/jv/8/8e/Laskar_pelangi_sampul.jpg?20080215125213",
        price: 100000,
        CategoryId: 1,
        createdAt: "2025-02-26T16:44:14+07:00",
        updatedAt: "2025-02-26T16:44:14+07:00"
      },
      {
        title: "Sebuah Seni untuk Bersikap Bodo Amat",
        author: "Mark Manson",
        image: "https://cdn-images-3.listennotes.com/podcasts/the-subtle-art-of-not-giving-a-f-ck-mark-s1XG9L-Tzur-vncAuP4lCbh.1400x1400.jpg",
        price: 100000,
        CategoryId: 2,
        createdAt: "2025-02-26T16:44:14+07:00",
        updatedAt: "2025-02-26T16:44:14+07:00"
      },
      {
        title: "Filosofi Teras",
        author: "Henry Manampiring",
        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1548033656i/42861019.jpg",
        price: 100000,
        CategoryId: 2,
        createdAt: "2025-02-26T16:44:14+07:00",
        updatedAt: "2025-02-26T16:44:14+07:00"
      },
      {
        title: "Harry Potter dan Batu Bertuah",
        author: "J.K. Rowling",
        image: "https://upload.wikimedia.org/wikipedia/id/b/bf/Harry_Potter_and_the_Sorcerer%27s_Stone.jpg",
        price: 100000,
        CategoryId: 1,
        createdAt: "2025-02-26T16:44:14+07:00",
        updatedAt: "2025-02-26T16:44:14+07:00"
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        image: "https://images-na.ssl-images-amazon.com/images/I/513Y5o-DYtL._SX328_BO1,204,203,200_.jpg",
        price: 100000,
        CategoryId: 2,
        createdAt: "2025-02-26T16:44:14+07:00",
        updatedAt: "2025-02-26T16:44:14+07:00"
      },
    ];

    await queryInterface.bulkInsert("Books", books, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Books", null, {});
  },
};
