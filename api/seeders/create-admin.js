'use strict';

const prompt = require('prompt-sync')({sigint: true});
const bcrypt = require("bcrypt");
const userRoles = require('../helpers/userRoles');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const password = prompt('Введите пароль администратора: ');
    await queryInterface.bulkInsert('users', [{
      email: 'admin@example.com',
      password: await bcrypt.hash(password, 10),
      phoneNumber: '+12345678910',
      firstName: 'Admin',
      lastName: 'Admin',
      city: 'New York',
      role: userRoles.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
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
