/*
*   BaseModel.js
*
*   Base model that have basic methods for all models
*
*/
const squel = require('squel')

const BaseModel = {
  
  db () {
    return global.databases.mysql
    // return global.databases.sqlite
  },

  /*
  |------------------------------------------------
  | get([id])
  |------------------------------------------------
  */
  get (id = false) {
    let sql = squel.select().from(this.table)
    id ? sql.where('id = ' + id) : false  
    sql = sql.toString()

    return this.db().query(sql)
  },

  /*
  |------------------------------------------------
  | create()
  |------------------------------------------------
  */
  create (data = false) {
    if (!data) {
      return 'no data provided'
    }

    let sql = squel.insert()
                   .into(this.table)
                   .setFields(data)
                   .toString()

    return this.db().run(sql)
  },

  

  /*
  |------------------------------------------------
  | delete()
  |------------------------------------------------
  */
  delete (id = false) {
    if (!id) {
      return 'no id provided'
    }

    let sql = squel.delete()
                   .from(this.table)
                   .where('id = ' + id)
                   .toString()

    return this.db().run(sql)
  },

  /*
  |------------------------------------------------
  | update()
  |------------------------------------------------
  */
  update (data = false) {
    if (!data) {
      return 'no data provided'
    }

    let sql = squel.update()
                   .table(this.table)
                   .setFields(data)
                   .toString()

    return this.db().run(sql)
  }
}

module.exports = BaseModel
