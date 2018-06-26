/*
*  User.js
*
*  Model of "users", mongoose model
*/

const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  // id: Schema.ObjectId,
  email: String,
  password: String
})

module.exports = mongoose.model('users', userSchema)
