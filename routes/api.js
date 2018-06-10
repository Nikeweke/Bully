/*
*   api.js
*
*   API Routes
*
*/

// Define your Middleware here
const CheckRequestMiddleware =  require('./middleware/CheckRequest');

// Define your controller here
const CheckRequest =  require('../app/helpers/CheckRequest');

module.exports = function (app) {
  app.all('/api/test', CheckRequestMiddleware, CheckRequest.Check)
}
