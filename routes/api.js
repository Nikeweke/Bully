/*
 *   api.js
 *
 *   API Routes
 *
 */

const CheckRequest = require('../app/helpers/CheckRequest');

module.exports = function (app) {
  app.group("/api", (router) => {

    router.all('/check', CheckRequest.Check) // gives info about request, output in console and in browser

  })
}