/** @module AuthController */

const bcrypt = require('bcrypt') 
const userModel = require('../models/User')
const emailHelper = require('../helpers/Email')

module.exports = {

    // check user if exist in db, if true - return token
    async checkUser (req, res) {
      let {email, password} = req.body

      // - Проверять, есть ли пользователь в базе и генерировать токен. 

      // check email for valid
      if (!emailHelper.validateEmail(email)) {
        return res.send({success: 0, message: 'Email is invalid'})
      }

      // searching for user in db by email
      let foundedUser = await userModel.findOne({ email }, (err) => {
        if (err) console.log(err)
      })

      // if no user found
      if (!foundedUser) {
        return res.send({success: 0, message: 'No user found'})
      }

      // check password
      bcrypt.compare(password, foundedUser.password,  (err, result) => {
        let resMsg = {}
        if (result === true) {
          resMsg = {success: 1, message: 'Well done! You logged in successfuly'}
        } else {
          resMsg = {success: 0, message: 'Email or password is wrong'}
        }
        return res.send(resMsg)
      })
    },


    // create new user
    registerUser (req, res) {
       // create item
       userModel.create(req.body, (err, item) => {
        if (err) { 
          console.log(err) 
          res.send({success:0, message: 'Fail to add user'})
        }
        res.send({success:1, message: 'User successfuly created', id: item._id})
      })
    }
  
  }
  
