const
  router = require('express').Router(),
  User = require('../controller/userController'),
  { count, getAll, getById, register, create, editOne, deleteOne, getMe, editMe, delMe, login, logout } = require('../controller/userController.js');

const isAdmin = require('../middleware/isAdmin')
const isAuth = require('../middleware/isAuth')
const apicache = require('apicache')
const cache = apicache.middleware

const user = new User()


router
  
  .get ('/me', isAuth, user.getMe)
  .put ('/me', isAuth, user.editMe)
  .delete ('/me', isAuth, user.delMe)
  .post('/logout',isAuth, user.logout )


  .get('/', isAdmin, (_,__,n) => user.getAll(_,__,n) )
  .post('/', isAdmin, (_,__,n) => user.createOne(_,__,n))
  .put('/:id', isAdmin, (_,__,n) => user.editOne(_,__,n))
  .delete('/:id', isAdmin, (_,__,n) => user.deleteOne(_,__,n))
  .get('/count', cache("25 seconds"), isAdmin, (_,__,n) => user.count(_,__,n))
  .get('/:id', cache("25 seconds"), isAdmin, (_,__,n) => user.getOne(_,__,n))  

  .post('/login', user.login )
  .post('/register', user.register)

module.exports = router;