/*
*  routes.js
*
*  Маршруты приложения
*/
const bodyParser   = require('body-parser') 
const cookieParser = require('cookie-parser') 
const helmet       = require('helmet')
const compression  = require('compression')


module.exports = function (app) {
  // data parsers
  app.use(bodyParser.json()) // parse request data - application/json
  app.use(bodyParser.urlencoded({ extended: false })) // parse request data - application/x-www-form-urlencoded
  app.use(cookieParser())

  // security
  app.use(helmet())
  app.disable('x-powered-by')

  // perfomance
  app.use(compression())


  // routes
  app.use('/',    require('../routes/web'))
  app.use('/api', require('../routes/api'))
}
