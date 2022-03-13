function apiErrorHandler (req, res, n) {

  res.status(404).json({
    msg : ' La rotta richiesta non esiste ',
    route: {
      method: req.method,
      fullUrl: req.protocol + '://' + req.hostname + req.originalUrl,
      url: req.url
    },
    ip : req.headers['x-forwarded-for'] || req.socket.remoteAddress
  })


}

module.exports = apiErrorHandler;