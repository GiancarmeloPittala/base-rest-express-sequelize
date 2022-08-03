const Apierror = require("../error/api-error")
const models = require('../models');

class BaseController{

  constructor(options){
    const { tableName, include } = options;

    this.include = include;
    this.tableName = tableName;
    
    return this;
  }

  async getAll(req,res,n){
    try {

      const { where, order, limit, offset, attributes } = req.query;

      let _where = where ? JSON.parse( where ) : undefined;
      let _order = order ? JSON.parse( order ) : undefined;
      let _limit = Number(  limit  ?? 1000 );
      let _offset = Number(  offset  ?? 0 );
      let _attributes = attributes ? JSON.parse(  attributes ) : undefined;
      let include = this.include || [];

      const data = await models[this.tableName].findAll({ 
        include, 
        where: _where , 
        order: _order , 
        limit: _limit , 
        offset: _offset , 
        attributes: _attributes  })

      const count = await models[this.tableName].count({ where })

      return res.json({data,count})
    } catch (error) {
      n ( Apierror.badRequest(error) )
    }
  }
  async createOne(req,res,n){
    try {
      const {data: dataBody} = req.body;
      const data = await models[this.tableName].create(dataBody)

      res.json( { data } )

    } catch (error) {
      n ( Apierror.badRequest(error) )
    }
  }
  async getOne(req,res,n){
    try {
      const { id } = req.params;
      const data = await models[this.tableName].findByPk(id);

      res.json({data})
    } catch (error) {
      n ( Apierror.badRequest(error) )
    }
  }
  async editOne(req,res,n){
    try {

      const { id } = req.params;
      const { body } = req;

      const notModifyCol = ['id', 'createdAt', 'updatedAt'];

      let data = await models[this.tableName].findByPk(id);

      if( !data ) throw 'Id not found on '+ this.tableName + ' table';

      // Update value
      for( const key in body )
        if( !notModifyCol.includes( key ))
            data[key] = body[key]

      // save value on database
      await data.save()

      // get new data from database
      data = await models[this.tableName].findByPk(id);

      res.json({data})
      
    } catch (error) {
      n ( Apierror.badRequest(error) )
    }
  }
  async deleteOne(req,res,n){
    try {
      const { id } = req.params;
      const data = await models[this.tableName].destroy({ where: { id } })

      res.json( {data} )
    } catch (error) {
      n ( Apierror.badRequest(error) ) 
    }
  }
  async count(req,res,n){
    try {
      const { where } = req.query;
      let _where = where ? JSON.parse( where ) : undefined;

      const count = await models[this.tableName].count({ where: _where })

      res.json({ count })
    } catch (error) {
      n ( Apierror.badRequest(error) ) 
    }
  }

}

module.exports = BaseController;