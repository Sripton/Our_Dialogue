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
     */
    await queryInterface.bulkInsert(
      "Subjects",
      [
        {
          subjectName: "Ботаника",
          direction_id: 1,
        },
        {
          subjectName: "Анатомия",
          direction_id: 1,
        },
        {
          subjectName: "Зоология",
          direction_id: 1,
        },
        {
          subjectName: "Дебют",
          direction_id: 2,
        },
        {
          subjectName: "Миттельшпиль",
          direction_id: 2,
        },
        {
          subjectName: "эндшпиль",
          direction_id: 2,
        },
        {
          subjectName: "История России",
          direction_id: 3,
        },
        {
          subjectName: "История Запада",
          direction_id: 3,
        },
        {
          subjectName: "История Азии",
          direction_id: 3,
        },
        {
          subjectName: "Мат. Анализ",
          direction_id: 4,
        },
        {
          subjectName: "Линейная алгебра",
          direction_id: 4,
        },
        {
          subjectName: "Комбинаторика",
          direction_id: 4,
        },

      ],
      {}
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
