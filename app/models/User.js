/*
*   User.js
*
*   model of table 'users', extends by BaseModel with crud functions
*
*/

const squel = require('squel')
const BaseModel = require('./BaseModel')
const { db } = require('../../config/database.js')

const User = {
  table: 'users'
}

module.exports = Object.assign(User, BaseModel)
