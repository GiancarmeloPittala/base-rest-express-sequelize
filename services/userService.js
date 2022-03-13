const { User } = require('../models');

class Service {
  async findAndCountAll(data){
    try {
      const {
        where, order, limit, offset, attributes
      } = data;

      const rows = await User.findAll({where, order, limit, offset, attributes })
      const count = await User.count({ where })

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

      return await User.findAll({where, order, limit, offset, attributes })
    } catch (error) {
      throw error;
    }
  }
  async findOne(data){
    try {
      const {
        where
      } = data;

      return await User.findOne({ where })
    } catch (error) {
      throw error;
    }
  }
  async bulkCreate(data){
    try {
      return await User.bulkCreate(data)
    } catch (error) {
      throw error;
    }
  }
  async update({data, where}){
    try {
      if (!where) throw "Passare il where";    
      return await User.update(data,{where: where })
    } catch (error) {
      console.error( error )
      throw error;
    }
  }
  async destroy({where}){
    try {
      if (!where) throw "Passare il where";    
      return await User.destroy({where: where })
    } catch (error) {
      console.error( error )
      throw error;
    }
  }
  async count({where}){
    try {
      return await User.count({where: where })
    } catch (error) {
      console.error( error )
      throw error;
    }
  }
}


module.exports = new Service;