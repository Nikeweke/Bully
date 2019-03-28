/*
*   User.js
*
*   model of table 'users', extends by BaseModel with crud functions
*
*/

const BaseModel = require('./BaseModel')

const Model = {
  table: 'USERS',
  
  // if you wanna make sql query here: this.db.run('select * from table')
}

/*
How to use in controller: 
const userModel = require('../models/User')
...
userModel.get()
userModel.insert()
...
*/


module.exports = {...BaseModel, ...Model}
