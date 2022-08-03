const rateLimit = require( 'express-rate-limit' )

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 300, 
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
})  

module.exports = () => { return apiLimiter }
