const { Role } = require('../models');

class Service {
  async findAndCountAll(data){
    try {
      const {
        where, order, limit, offset, attributes, include
      } = data;

      const rows = await Role.findAll({ include, where, order, limit, offset, attributes })
      const count = await Role.count({ where })

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

      return await Role.findAll({where, order, limit, offset, attributes })
    } catch (error) {
      throw error;
    }
  }
  async findOne(data){
    try {
      const {
        where, order, limit, offset, attributes, include
      } = data;

      return await Role.findOne({ where, order, limit, offset, attributes, include })
    } catch (error) {
      throw error;
    }
  }
  async bulkCreate(data){
    try {
      return await Role.bulkCreate(data)
    } catch (error) {
      throw error;
    }
  }
  async update({data, where}){
    try {
      if (!where) throw "Passare il where";    
      return await Role.update(data,{where: where })
    } catch (error) {
      console.error( error )
      throw error;
    }
  }
  async destroy({where}){
    try {
      if (!where) throw "Passare il where";    
      return await Role.destroy({where: where })
    } catch (error) {
      console.error( error )
      throw error;
    }
  }
  async count({where}){
    try {
      return await Role.count({where: where })
    } catch (error) {
      console.error( error )
      throw error;
    }
  }
}


module.exports = new Service;