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
          img: "/img/subjects/biobotanica.jpg",
        },
        {
          subjectName: "Анатомия",
          direction_id: 1,
          img: "/img/subjects/bioanatomy.jpg",
        },
        {
          subjectName: "Зоология",
          direction_id: 1,
          img: "/img/subjects/boizoology.jpg",
        },
        {
          subjectName: "Гистология",
          direction_id: 1,
          img: "/img/subjects/biologyGistologiya.jpg",
        },
        {
          subjectName: "Иммунология",
          direction_id: 1,
          img: "/img/subjects/biologyImmunology.jpg",
        },
        {
          subjectName: "Армагедон",
          direction_id: 2,
          img: "/img/subjects/chessArmagedon.jpg",
        },
        {
          subjectName: "Буллет",
          direction_id: 2,
          img: "/img/subjects/chessBullet.jpg",
        },
        {
          subjectName: "Классическая партия",
          direction_id: 2,
          img: "/img/subjects/chessClassic.jpg",
        },
        {
          subjectName: "Эндшпиль",
          direction_id: 2,
          img: "/img/subjects/chessEndShpil.jpg",
        },
        {
          subjectName: "Гамбит",
          direction_id: 2,
          img: "/img/subjects/chessGambit.jpg",
        },
        {
          subjectName: "Рапид",
          direction_id: 2,
          img: "/img/subjects/chessRapid.jpg",
        },
        {
          subjectName: "История России",
          direction_id: 3,
          img: "/img/subjects/historyRussia.jpg",
        },
        {
          subjectName: "История Запада",
          direction_id: 3,
          img: "/img/subjects/historyWest.jpg",
        },
        {
          subjectName: "История Азии",
          direction_id: 3,
          img: "/img/subjects/historyAzia.jpg",
        },
        {
          subjectName: "История древней Персии",
          direction_id: 3,
          img: "/img/subjects/historyPersia.jpg",
        },
        {
          subjectName: "История Европы",
          direction_id: 3,
          img: "/img/subjects/historyEurope.jpg",
        },
        {
          subjectName: "История древнего Египта",
          direction_id: 3,
          img: "/img/subjects/historyEgypt.jpg",
        },
        {
          subjectName: "Мат. Анализ",
          direction_id: 4,
          img: "/img/subjects/mathAnalize.jpg",
        },
        {
          subjectName: "Алгебра",
          direction_id: 4,
          img: "/img/subjects/mathAlgebra.jpg",
        },
        {
          subjectName: "Геометрия",
          direction_id: 4,
          img: "/img/subjects/mathGeometry.jpg",
        },
        {
          subjectName: "Мат. логика",
          direction_id: 4,
          img: "/img/subjects/mathLogic.jpg",
        },
        {
          subjectName: "Теория вероятности",
          direction_id: 4,
          img: "/img/subjects/mathProbably.jpg",
        },
        {
          subjectName: "Мат. статистика",
          direction_id: 4,
          img: "/img/subjects/mathStatistic.jpg",
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
