const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream') // version 2.x

const generate = () => (new Date().toISOString().split('T')[0] + '.log');

const accessLogStream = rfs.createStream(generate(), {
  interval: '1d', // rotate daily
  path: path.join(__dirname, '../', 'log')
})

const opts = { 
  skip: function (req, res) { return res.statusCode < 200 },
  stream: accessLogStream 
}
module.exports = () => [ morgan('combined', opts) ]