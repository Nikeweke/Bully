/*
*   User.js
*
*   model of table 'users'
*
*/

const squel = require('squel')
const BaseModel = require('./BaseModel')
const { db } = require('../../config/database.js')

const User = {
  table: 'users'
}

module.exports = Object.assign(User, BaseModel)
