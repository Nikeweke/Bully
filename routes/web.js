/*
*   web.js
*
*   Web Routes
*
*/
// Define your controller here
const IndexCtrl = require('../app/controllers/IndexController')

// Define your Middleware here
const checkRequest = require('./middleware/CheckRequest')
const middlewares = [checkRequest]

module.exports = function (app) {
  //  home page
  app.get('/', middlewares, (res, req) => IndexCtrl.Index(res, req)) 

  // test your request
  app.all('/test', (res, req) => IndexCtrl.Test(res, req))
}
