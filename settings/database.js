/*
*  database.js
*
*  Работа с БД (все подключение сохраняем в "conn" - (Example: global.databases.mysql.conn = ...)
*/
const colors     = require('colors')
const CONFIG_DBS = global.config.databases 

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Подключение к БД
  |--------------------------------------------------------------------------
  */
  connect () {
    let { mysql, sqlite, mongodb,  } = CONFIG_DBS

    if (mysql.enabled) {
      this.connectMysql()
    }

    if (sqlite.enabled) {
      this.connectSqlite()
    }

    if (mongodb.enabled) {
      this.connectMongodb()
    }
  },


  /*
  |--------------------------------------------------------------------------
  | Подключение к MySql
  |--------------------------------------------------------------------------
  */
  connectMysql () {
    let {host, user, password, db_name} = CONFIG_DBS.mysql
    const Mysql = require('sync-mysql')
    global.databases.mysql = new Mysql({
      host,
      user,
      password,
      database: db_name
    })
    console.log(colors.green.bold('MySQL') + ' => Connected')
  },


  /*
  |--------------------------------------------------------------------------
  | Подключение к SQLite
  |--------------------------------------------------------------------------
  */
  connectSqlite () {
    let { db_adress } = CONFIG_DBS.sqlite
    global.databases.sqlite = require('sqlite-sync').connect(db_adress)
    console.log('SQLite'.green.bold + ' => Connected')

  },


  /*
  |--------------------------------------------------------------------------
  | Подключение к Mongodb
  |--------------------------------------------------------------------------
  */
  connectMongodb () {
    const {db_adress}    = CONFIG_DBS.mongodb
    const mongoose       = require('mongoose')
    const { errCatcher } = require('../app/helpers/ErrorCatcher')

    mongoose.connect(db_adress, { useNewUrlParser: true }).catch(errCatcher)

    // getting connection
    let db = mongoose.connection
    global.databases.mongodb = db

    // set listeners to events of DB
    db.on('error', errCatcher)
    db.on('connected', () => console.log(colors.green.bold('MongoDB') + ' => Connected'))
  },
}
