
const express = require('express');
const Router = express.Router();
const helmet = require('helmet');
const notFound = require('../error/notFoundHandler'); 
const apiErrorHandler = require('../error/api-error-handler'); 
const logger = require('./logger');
const cors = require('cors'); 
const useragent = require('express-useragent');
const ratelimiter = require('./ratelimiter')
const userRouter = require('./userRouter')


Router
  .use( ratelimiter() )
  .use( useragent.express() )
  .use( helmet() )
  .use( logger() )
  .use( cors() )
  .use( express.json() )
  .use( express.urlencoded({extended: true}) )

  /*All ROUTERS */

  .use( '/user', userRouter )
  .get('/ip', (request, response) => response.send(request.ip))
  .use( notFound )
  .use( apiErrorHandler )




module.exports = Router;