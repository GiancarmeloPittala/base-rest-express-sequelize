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
      // qui thi è undefined
      console.log( this.tableName )
      let _where = where ? JSON.parse( where ) : undefined;
      let _order = order ? JSON.parse( order ) : undefined;
      let _limit = Number(  limit  ?? 1000 );
      let _offset = Number(  offset  ?? 0 );
      let _attributes = attributes ? JSON.parse(  attributes ) : undefined;
      let include = this.include || [];

      const rows = await models[this.tableName].findAll({ 
        include, 
        where: _where , 
        order: _order , 
        limit: _limit , 
        offset: _offset , 
        attributes: _attributes  })

      const count = await models[this.tableName].count({ where })

      res.json({rows,count})
    } catch (error) {
      n ( Apierror.badRequest(error) )
    }
  }
  async createOne(req,res,n){
    try {
      const data = req.body;
      const newData = await models[this.tableName].create(data)

      res.json( { data: newData } )

    } catch (error) {
      n ( Apierror.badRequest(error) )
    }
  }
  getOne(req,res,n){
    try {
      res.json({})
    } catch (error) {
      n ( Apierror.badRequest(error) )
    }
  }
  editOne(req,res,n){
    try {
      res.json({})
      
    } catch (error) {
      n ( Apierror.badRequest(error) )
    }
  }
  async deleteOne(req,res,n){
    try {
      const { id } = req.params;
      const result = await models[this.tableName].destroy({ where: { id } })

      res.json( result )
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