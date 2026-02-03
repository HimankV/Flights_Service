"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *
     */
    await queryInterface.bulkInsert(
      "Airplanes",
      [
        {
          modelNumber: "Indigo1000",
          capacity: 50,
        },
        {
          modelNumber: "Indigo2000",
          capacity: 51,
        },
        {
          modelNumber: "Indigo3000",
          capacity: 52,
        },
        {
          modelNumber: "Indigo4000",
          capacity: 53,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: "Indigo5000",
          capacity: 54,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: "Indigo6000",
          capacity: 55,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          modelNumber: "Indigo7000",
          capacity: 56,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
