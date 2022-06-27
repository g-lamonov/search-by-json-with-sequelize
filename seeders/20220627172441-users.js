'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const firstUserUUID = 'f0893201-d9d4-4db3-9c42-00a0b0919adc';
      const secondUserUUID = 'e7d8263f-47e1-4e9c-b757-7c7b0ee23b3c'

      await queryInterface.bulkInsert('Users', [{
        id: firstUserUUID,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john_doe@example.com',
        username: 'john_doe',
        password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
        changes: JSON.stringify({
          firstName: 'Ivan',
          lastName: 'Ivanov',
          location: {
            country: 'Russia'
          }
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: secondUserUUID,
        firstName: 'Si',
        lastName: 'Polan',
        email: 'si_polan@example.com',
        username: 'si_polan',
        password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
        changes: JSON.stringify({
          firstName: 'Janez',
          lastName: 'Novak',
          location: {
            country: 'Brazil'
          }
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {
        ignoreDuplicates: true,
        transaction
      });

      await queryInterface.bulkInsert('UserProfiles', [{
        id: firstUserUUID,
        biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: secondUserUUID,
        biography: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {
        ignoreDuplicates: true,
        transaction
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback()
      throw err;
    }
     
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
