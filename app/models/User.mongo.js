/*
*  User.js
*
*  Model of "users"
*/

const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  // id: Schema.ObjectId,
  email: String,
  password: String
})

module.exports = mongoose.model('users', userSchema)
