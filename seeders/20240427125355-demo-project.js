"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Testimonials", [
      {
        author: "Huda",
        message: "28-04-2024",
        rating: "05-05-2024",
        image:
          "https://images.pexels.com/photos/15899541/pexels-photo-15899541/free-photo-of-laptop-laki-laki-pria-lelaki.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Projects", null, {});
  },
};
