const Apierror = require("../error/api-error");
const
  jwt = require('jsonwebtoken'),
  { QueryTypes } = require('sequelize'),
  { Utente } = require( '../models' );


module.exports = async ( req,res, next ) => {
  if ( req.user != undefined ) n();

  const authToken = req.headers.authorization;
  
  try {
      if( !authToken || authToken.length < 60 ) throw { msg: 'Token necessario'}
  
      const token = authToken.split(' ')[1];

      const user = jwt.verify(token, process.env.JWT_SECRET)
      if ( !user ) throw ' Errore di autenticazione'

      req.user = req.user ? req.user : { };
      req.user.id = user.id 
      
      return next()
      
    } catch (error) {
      console.error( error )
      next( Apierror.badRequest( error ));
      return;
    }
}