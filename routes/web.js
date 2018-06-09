/*
*   web.js
*
*   Web Routes
*
*/

// Define your Middleware here
const checkRequest = require('./middleware/CheckRequest')

// Define your controller here
const IndexCtrl = require('../app/controllers/IndexController')

const middlewares = [checkRequest]

module.exports = function (app) {
  //  main page
  app.get('/', middlewares, (res, req) => IndexCtrl.Index(res, req)) // 'this' works in function
  // app.get('/', middlewares,  IndexCtrl.Index);  // 'this' NOT works in function
  // app.get('/', middlewares,   function(res, req){ IndexCtrl.Index(res, req) });  // 'this' works in function

  // test your request
  app.all('/t', (res, req) => IndexCtrl.Test(res, req))

  //  catch form data
  app.post('/form', (req, res) => { res.send(req.body) })
}
