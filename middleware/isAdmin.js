const ApiError = require('../error/api-error');
const { User, Role } = require( '../models' );
const isAuth = require('./isAuth');

const isAdmin = async (req,res,n) => {
  try {   
    const user = await User.findOne({where: { id: req.user.id } })
    
    if( !user) throw 'Il token è associato ad un account eliminato';
    
    const adminRole = await Role.findOne({where: { name: 'Admin' }}) ;
    const userRoles = await user.getUserRoles();
    const userRolesIds = userRoles.map( role => role.RoleId )

    if ( userRolesIds.includes(adminRole.id) )
      return n();
    else
      throw 'Non possiedi i permessi necessari'
  } catch (error) {
    return n( ApiError.Unauthorized(error) )
  } 
}
module.exports = [ isAuth, isAdmin ]