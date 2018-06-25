/*
*  database.js
*
*  Работа с БД (все подключение сохраняем в "conn" - (Example: global.databases.mysql.conn = ...)
*/
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
    const Mysql = require('sync-mysql')
    dbConfig.mysql.conn = new Mysql({
      host: 'localhost',
      user: 'root',
      password: 'db_pass',
      database: 'db_name'
    })
  },

  /*
  |--------------------------------------------------------------------------
  | Подключение к SQLite
  |--------------------------------------------------------------------------
  */
  connectSqlite () {
    dbConfig.sqlite.conn = require('sqlite-sync').connect('./db.sqlite')
  },

  /*
  |--------------------------------------------------------------------------
  | Подключение к Mongodb
  |--------------------------------------------------------------------------
  */
  connectMongodb () {
    dbConfig.mongodb.conn = require('mongoose').connect('mongodb://localhost:27017/ToDoDb')
  }

}
