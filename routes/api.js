/*
*   api.js
*
*   API Routes
*
*/

// Define your Middleware here

// Define your controller here
const CheckRequest =  require('../app/helpers/CheckRequest');

module.exports = function (app) {
  app.all('/api', CheckRequest.Check)
}
