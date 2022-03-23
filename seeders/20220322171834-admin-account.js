'use strict';
const { bulkCreate } = require('../services/userService');
const { UserRole, Role, User } = require('../models')

const bcrypt = require('bcryptjs');

const adminUser = {
  name: 'Admin' , 
  email: 'admin@gmail.com', 
  password: 'Test@1234',
  isConfirmed: true
}
module.exports = {
  async up (queryInterface, Sequelize) {
 

      // genero la password con hash
      const salt = bcrypt.genSaltSync(13);
      const hash = bcrypt.hashSync(adminUser.password, salt);

      try {
        const adminRole = await Role.findOne({ where: { name: 'Admin' }})
        const [newUser] = await bulkCreate([{ ...adminUser, password: hash }]);
  
        return await UserRole.create({ RoleId: adminRole.id, UserId: newUser.id })
        
      } catch (error) {
        console.error( error )
      }

  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op; 
     return await User.destroy({ where: { email: adminUser.adminUser } })
  }
};
