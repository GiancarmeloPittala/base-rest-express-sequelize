const Apierror = require("../error/api-error")
const jwt = require('jsonwebtoken');

const { UserRole, Role } = require('../models')
const { JWT_SECRET } = process.env;
const { findAll, bulkCreate, findAndCountAll, update, destroy, count, findOne } = require('../services/userService');
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

      const users = await findAndCountAll({
         where: _where,
         order: _order,
         limit: _limit,
         offset: _offset,
         attributes: _attributes,
         include: [  {
          model: UserRole,
          include: [ {
            model: Role,
            attributes: ['id','name']
          } ]
        } ]
      })

      res.json(users)

      return;
    } catch (error) {
      n( Apierror.badRequest(error) )
    }
  }
  async getById(req,res,n){
    try {
      const { id } = req.params;
      const user = await findOne({ where: { id } })

      res.json({ user })
    } catch (error) {
      n( Apierror.badRequest() )
    }
  }
  async create(req,res,n){
    try {
      const { password } = req.body;
      
      if ( password ){
        // genero la password con hash
        const salt = bcrypt.genSaltSync(13);
        const hash = bcrypt.hashSync(password, salt);
  
        const [newUser] = await bulkCreate([{ ...req.body, 
          id:undefined, 
          password: hash }])
  
        return res.status(201).json({ user: newUser })
      } else {
        const [newUser] = await bulkCreate([{ 
          ...req.body, 
          id:undefined
        }])
  
        return res.status(201).json({ user: newUser })
      }

    } catch (error) {
      n( Apierror.badRequest(error) )
    }
  }
  async register(req,res,n){
    try {
      const { name, email, password } = req.body;

      // controllo campi obbligatori
      if ( !email ) throw 'Email is required';
      if ( !name ) throw 'Name is required';
      if ( !password ) throw 'password is required';

      // controlle se esiste l'email sul database
      const usercCheck = await findOne({ where: { email } })

      if ( usercCheck ) throw "Registered email please login"


      // genero la password con hash
      const salt = bcrypt.genSaltSync(13);
      const hash = bcrypt.hashSync(password, salt);

      const [newUser] = await bulkCreate([{ name, email, password: hash }])

      return res.status(201).json({ user: newUser })
    } catch (error) {
      n( Apierror.badRequest(error) )
    }
  }
  async editOne(req,res,n){
    try {
      const { id } = req.params;

      const user = await findOne({ where: { id } })
      const notAcceptedCol = ['createdAt', 'id', 'updatedAt']
      if ( !user ) throw 'L\'utente non è stato trovato'
      
      //Modify colonne consentite
      for ( let col in req.body )
        if( !notAcceptedCol.includes( col ) )
          user[col] = req.body[col]

      await user.save()

      return res.json({user});
    } catch (error) {
      n( Apierror.badRequest() )
    }
  }
  async deleteOne(req,res,n){
    try {
      const { id } = req.params;
      
      const user = await findOne({ where: { id } })

      if ( !user ) throw 'L\'user not found';

      await user.destroy();

      return res.json({ msg: 'Account deleted successfully' });
    } catch (error) {
      n( Apierror.badRequest() )
    }
  }
  async getMe(req,res,n){
    try {
      const { id } = req.user;

      const user = await findOne({ where: { id }, include: [
        {
          model: UserRole,
          include: [ {
            model: Role,
            attributes: ['id','name']
          } ]
        }
      ] })

      if ( !user ) throw 'L\'utente non è stato trovato'

      const lastLoggedIn = (await user.getUserLoggedIns({  
        order: [['createdAt','DESC']],
        limit: 1}))[0]


      return res.json({user: user, lastLoggedIn});
    } catch (error) {
      n ( Apierror.badFields(error) ) 
    }
  } 
  async delMe(req,res,n){
    try {
      const { id } = req.user;

      const user = await findOne({ where: { id } })

      if ( !user ) throw 'L\'user not found';

      await user.destroy();

      return res.json({ msg: 'Account deleted successfully' });
    } catch (error) {
      n ( Apierror.badFields(error) ) 
    }
  }
  async editMe(req,res,n){
    try {
      const { id } = req.user;

      const user = await findOne({ where: { id } })
      const notAcceptedCol = ['createdAt', 'id', 'updatedAt','isConfirmed','isBlocked']
      if ( !user ) throw 'L\'utente non è stato trovato'
      
      //Modify colonne consentite
      for ( let col in req.body )
        if( !notAcceptedCol.includes( col ) )
          user[col] = req.body[col]

      await user.save()

      return res.json({user});
    } catch (error) {
      n ( Apierror.badFields(error) ) 
    }
  }
  async login(req,res,n){
    try {
      const { email, password } = req.body;

      // controllo cambi obbligatori
      if ( !email ) throw 'Email is required';
      if ( !password ) throw 'password is required';

      // controlle se esiste l'email sul database
      const user = await findOne({ where: { email } })

      if ( !user ) throw "Unregistered email please register";

      // controllo che la password sia corretta
      const { password: _password } = user;

      if ( !bcrypt.compareSync(password,_password) ) throw 'Wrong password';

      // torno utente e token
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1w' })

      const useragent = { ...req.useragent,
        headers: req.headers,
        ip: req.ip
      };

      // Create record for login time
      await user.createUserLoggedIn({ token, info: JSON.stringify(useragent) });

      return res.status(201).json({ user, token })

    } catch (error) {
      n ( Apierror.badRequest(error) ) 
    }
  } 
  async logout(req,res,n){
    try {
      res.status(200).json({ msg: 'ok'})
    } catch (error) {
      n ( Apierror.badRequest(error) ) 
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