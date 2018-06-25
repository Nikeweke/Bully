/*
*  database.js
*
*  Работа с БД (все подключение сохраняем в "conn" - (Example: global.databases.mysql.conn = ...)
*/
const colors = require('colors')
const dbConfig = global.config.databases

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Подключение к БД
  |--------------------------------------------------------------------------
  */
  connect () {
    if (dbConfig.mysql.enabled) {
      this.connectMysql()
    }

    if (dbConfig.sqlite.enabled) {
      this.connectSqlite()
    }

    if (dbConfig.mongodb.enabled) {
      this.connectMongodb()
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Подключение к MySql
  |--------------------------------------------------------------------------
  */
  connectMysql () {
    let {host, user, password, database} = global.config.databases.mysql
    const Mysql = require('sync-mysql')
    dbConfig.mysql.conn = new Mysql({
      host,
      user,
      password,
      database
    })
    console.log(colors.green.bold('MySQL') + ' => Connected')
  },

  /*
  |--------------------------------------------------------------------------
  | Подключение к SQLite
  |--------------------------------------------------------------------------
  */
  connectSqlite () {
    let {db_adress} = global.config.databases.sqlite
    dbConfig.sqlite.conn = require('sqlite-sync').connect(db_adress)
    console.log(colors.green.bold('SQLite') + ' => Connected')
  },

  /*
  |--------------------------------------------------------------------------
  | Подключение к Mongodb
  |--------------------------------------------------------------------------
  |
  */
  connectMongodb () {
    let {db_adress} = global.config.databases.mongodb
    dbConfig.mongodb.conn = require('mongoose').connect(db_adress)
    console.log(colors.green.bold('MongoDB') + ' => Connected')
  }

}
