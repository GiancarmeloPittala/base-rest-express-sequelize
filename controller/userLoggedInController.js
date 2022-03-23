const Apierror = require("../error/api-error")

const { UserLoggedIn, Role } = require('../models')
const { findAll, bulkCreate, findAndCountAll, destroy, count, findOne } = require('../services/userLoggedInService');
const bcrypt = require('bcryptjs');


class Controller{

  async getAll(req,res,n){
    try {
      const { where, order, limit, offset, attributes } = req.query;

      let _where = where ? JSON.parse( where ) : undefined;
      let _order = order ? JSON.parse( order ) : undefined;
      let _limit = Number(  limit  ?? 1000 );
      let _offset = Number(  offset  ?? 0 );
      let _attributes = attributes ? JSON.parse(  attributes ) : undefined;

      const UserLoggedIn = await findAndCountAll({
         where: _where,
         order: _order,
         limit: _limit,
         offset: _offset,
         attributes: _attributes
      })

      res.json(UserLoggedIn)

      return;
    } catch (error) {
      n( Apierror.badRequest(error) )
    }
  }
  async create(req,res,n){
    try {
      const [newrole] = await bulkCreate([{  ...req.body, id:undefined }])
      return res.status(201).json({ role: newrole })
    } catch (error) {
      n( Apierror.badRequest(error) )
    }
  }
  async deleteOne(req,res,n){
    try {
      const { id } = req.params;
      
      const UserLoggedIn = await findOne({ where: { id } })

      if ( !UserLoggedIn ) throw 'UserLoggedIn not found';

      await UserLoggedIn.destroy();

      return res.json({ msg: 'UserLoggedIn deleted successfully' });
    } catch (error) {
      n( Apierror.badRequest(error) )
    }
  }
  async count(req,res,n){
    try {
      const { where } = req.query;
      let _where = where ? JSON.parse( where ) : undefined;

      const _count = await count({ where: _where })

      res.json( {count: _count} )
    } catch (error) {
      n ( Apierror.badRequest(error) ) 
    }
  }

}


module.exports = new Controller;