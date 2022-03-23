const
  router = require('express').Router(),
  { count, getAll, create, deleteOne } = require('../controller/userRoleController.js');

const isAdmin = require('../middleware/isAdmin')
const apicache = require('apicache')

router
  .use(isAdmin)
  .get('/', getAll)
  .post('/', create)
  .delete('/:UserId/:RoleId', deleteOne )
  .get('/count', count)

module.exports = router;