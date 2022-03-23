const { Role, UserRole, UserLoggedIn } = require('../models');

class Service {
  async findAndCountAll(data){
    try {
      const {
        where, order, limit, offset, attributes, include
      } = data;

      const rows = await UserLoggedIn.findAll({ include, where, order, limit, offset, attributes })
      const count = await UserLoggedIn.count({ where })

      return { rows, count }
    } catch (error) {
      throw error;
    }
  }
  async findAll(data){
    try {
      const {
        where, order, limit, offset, attributes
      } = data;

      return await UserLoggedIn.findAll({where, order, limit, offset, attributes })
    } catch (error) {
      throw error;
    }
  }
  async findOne(data){
    try {
      const {
        where, order, limit, offset, attributes, include
      } = data;

      return await UserLoggedIn.findOne({ where, order, limit, offset, attributes, include })
    } catch (error) {
      throw error;
    }
  }
  async bulkCreate(data){
    try {
      return await UserLoggedIn.bulkCreate(data)
    } catch (error) {
      throw error;
    }
  }
  async update({data, where}){
    try {
      if (!where) throw "Passare il where";    
      return await UserLoggedIn.update(data,{where: where })
    } catch (error) {
      console.error( error )
      throw error;
    }
  }
  async destroy({where}){
    try {
      if (!where) throw "Passare il where";    
      return await UserLoggedIn.destroy({where: where })
    } catch (error) {
      console.error( error )
      throw error;
    }
  }
  async count({where}){
    try {
      return await UserLoggedIn.count({where: where })
    } catch (error) {
      console.error( error )
      throw error;
    }
  }
}


module.exports = new Service;