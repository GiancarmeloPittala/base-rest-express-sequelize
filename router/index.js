
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
const userRoleRouter = require('./userRoleRouter')
const userLoggedInRouter = require('./userLoggedInRouter')
const roleRouter = require('./roleRouter')


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
  .use( '/role', roleRouter )
  .use( '/userRole', userRoleRouter )
  .use( '/userLoggedIn', userLoggedInRouter )
  .get('/ping', (_, __) => __.send("Pong"))
  .use( notFound )
  .use( apiErrorHandler )




module.exports = Router;