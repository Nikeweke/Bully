/*
*   BaseModel.js
*
*   Base model that have basic methods for all models
*
*/

// packages
const squel = require('squel')
// const db = global.config.databases.sqlite.conn
// const db = global.config.databases.mysql.conn

const BaseModel = {

  /*
  |------------------------------------------------
  | get([id])
  |------------------------------------------------
  */
  get (id = false) {
    let sql = squel.select().from(this.table)

    if (id) {
      sql.where('id = ' + id)
    }

    sql = sql.toString()

    return db.run(sql)
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

    return db.run(sql)
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

    return db.run(sql)
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

    return db.run(sql)
  }
}

module.exports = BaseModel
