/*
*  Defining globals (allow understand which globals do we have)
*
*  globals.js
*/

module.exports = function () {
  // set global config 
  global.config  = require('../config.json') 

  // holds databases connections
  global.databases = {
    mysql: null,
    sqlite: null,
    mongo: null,
    pssql: null,
  }

  // holds socket connection
  // global.socketIo = null
}
