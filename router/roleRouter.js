const
  router = require('express').Router(),
  { count, getAll, getById, create, editOne, deleteOne } = require('../controller/roleController.js');

const isAdmin = require('../middleware/isAdmin')
const apicache = require('apicache')
const cache = apicache.middleware

router
  .use(isAdmin)
  .get('/', cache("25 seconds"), getAll)
  .post('/', create)
  .put('/:id',  editOne)
  .delete('/:id', deleteOne )
  .get('/count', cache("25 seconds"), count)
  .get('/:id', cache("25 seconds"), getById)

module.exports = router;