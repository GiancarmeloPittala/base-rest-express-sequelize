const
  router = require('express').Router(),
  UserRole = require('../controller/userRoleController');

const isAdmin = require('../middleware/isAdmin')
const apicache = require('apicache')
const cache = apicache.middleware

const userRole = new UserRole()

router
  .use(isAdmin)
  .get('/', (_,__,n) => userRole.getAll(_,__,n) )
  .post('/', (_,__,n) => userRole.createOne(_,__,n))
  .put('/:id', (_,__,n) => userRole.editOne(_,__,n))
  .delete('/:id', (_,__,n) => userRole.deleteOne(_,__,n))
  .get('/count', cache("25 seconds"), (_,__,n) => userRole.count(_,__,n))
  .get('/:id', cache("25 seconds"), (_,__,n) => userRole.getOne(_,__,n))

module.exports = router;