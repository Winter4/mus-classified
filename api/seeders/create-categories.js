'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'categories', 
      [
        { name: 'Электрогитары', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Педали и эффекты', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Усилители и комбоусилители', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Акустические и классические гитары', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Бас-гитары', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Ударные и перкуссия', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Духовые', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Смычковые', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Клавишные', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Прочее', createdAt: new Date(), updatedAt: new Date() },
      ], 
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
