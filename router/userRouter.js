const
  router = require('express').Router(),
  { count, getAll, getById, register, create, editOne, deleteOne, getMe, editMe, delMe, login, logout } = require('../controller/userController.js');

const isAdmin = require('../middleware/isAdmin')
const isAuth = require('../middleware/isAuth')
const apicache = require('apicache')
const cache = apicache.middleware

router
  
  .get ('/me', isAuth, getMe)
  .put ('/me', isAuth, editMe)
  .delete ('/me', isAuth, delMe)
  .post('/logout',isAuth, logout )
  
  .get('/', isAdmin, cache("25 seconds"), getAll)
  .post('/', isAdmin, create)
  .put('/:id', isAdmin, editOne)
  .delete('/:id', isAdmin, deleteOne )
  .get('/count', isAdmin, cache("25 seconds"), count)
  .get('/:id', isAdmin, cache("25 seconds"), getById)

  .post('/login', login )
  .post('/register', register)

module.exports = router;