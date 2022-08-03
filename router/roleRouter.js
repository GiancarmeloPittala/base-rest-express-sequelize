const
  router = require('express').Router(),
  Role = require('../controller/roleController');

const isAdmin = require('../middleware/isAdmin')
const apicache = require('apicache')
const cache = apicache.middleware

const role = new Role()

router
  .use(isAdmin)
  .get('/', (_,__,n) => role.getAll(_,__,n) )
  .post('/', (_,__,n) =>role.createOne(_,__,n))
  .put('/:id', (_,__,n) =>role.editOne(_,__,n))
  .delete('/:id', (_,__,n) =>role.deleteOne(_,__,n))
  .get('/count', (_,__,n) =>role.count(_,__,n))
  .get('/:id', (_,__,n) =>role.getOne(_,__,n))

module.exports = router;