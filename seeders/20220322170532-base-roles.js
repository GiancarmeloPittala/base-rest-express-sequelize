'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      const dates = {
        createdAt: new Date(),
        updatedAt: new Date()
      }   

      await queryInterface.bulkInsert('roles', [
      { name: 'Guest', ...dates},
      { name: 'Admin', ...dates}
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op; 
     await queryInterface.bulkDelete('roles', {
      [Op.or]: [
        { name: 'Guest'},
        { name: 'Admin'}
       ] 
     }, {});
  }
};
