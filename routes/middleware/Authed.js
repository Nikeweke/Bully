/*
*   Authed.js
*
*   IF user already authed
*/
const Authed = (req, res, next) => {
  console.log('Authed')
  next()
}

module.exports = Authed
