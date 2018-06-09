/*
*   AuthMiddleware.js
*
*   Тестовые middleware
*/

module.exports = {

  /*******************************************
  *  IF user Authed
  *
  *******************************************/
  authUser: function (req, res, next) {
    console.log('Authed')
    next()
  },

  /*******************************************
  *  IF user Logged in
  *
  *******************************************/
  loggedIn: function (req, res, next) {
    console.log('logged in')
    next()
  }

}
