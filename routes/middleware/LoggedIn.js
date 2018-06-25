/*
*   LoggedIn.js
*
*   IF user Logged in
*/

const LoggedIn = (req, res, next) => {
  console.log('logged in')
  next()
}

module.exports = LoggedIn
