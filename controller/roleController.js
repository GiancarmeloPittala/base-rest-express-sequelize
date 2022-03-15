const Apierror = require("../error/api-error")

const { findAll, bulkCreate, findAndCountAll, update, destroy, count, findOne } = require('../services/roleService');
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

      const roles = await findAndCountAll({
         where: _where,
         order: _order,
         limit: _limit,
         offset: _offset,
         attributes: _attributes
      })

      res.json(roles)

      return;
    } catch (error) {
      n( Apierror.badRequest(error) )
    }
  }
  async getById(req,res,n){
    try {
      const { id } = req.params;
      const role = await findOne({ where: { id } })

      res.json({ role })
    } catch (error) {
      n( Apierror.badRequest() )
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
  async editOne(req,res,n){
    try {
      const { id } = req.params;

      const role = await findOne({ where: { id } })
      const notAcceptedCol = ['createdAt', 'id', 'updatedAt']
      if ( !role ) throw 'Role not fount '
      
      //Modify colonne consentite
      for ( let col in req.body )
        if( !notAcceptedCol.includes( col ) )
          role[col] = req.body[col]

      
      await role.save()

      return res.json({role});
    } catch (error) {
      n( Apierror.badRequest(error) )
    }
  }
  async deleteOne(req,res,n){
    try {
      const { id } = req.params;
      
      const role = await findOne({ where: { id } })

      if ( !role ) throw 'Role not found';

      await role.destroy();

      return res.json({ msg: 'Role deleted successfully' });
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