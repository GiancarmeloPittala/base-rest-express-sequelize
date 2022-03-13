const Apierror = require('./api-error');

const getErrors = (msgs) => {
 return msgs.map( msg => msg.message ).join(",")
}


function apiErrorHandler ( err, req,res,n) {
  console.error( err )
  if (err instanceof Apierror) {
    if ( err.message.errors  )
      return res.status(err.code).json({ msg: getErrors(err.message.errors), error: true})
    else if ( err.message.message ) 
      return res.status(err.code).json({ msg: err.message.message, error: true})
    else
      return res.status(err.code).json({ msg: err.message, error: true})
  }
  return res.status(500).json('server error');
}



module.exports = apiErrorHandler;