/*
*  Sockets
*
*  sockets.js
*/

const colors        = require('colors')
const socketsConfig = global.config.sockets
const PORT          = socketsConfig.port ? socketsConfig.port : 2000 

// Sockets controllers
const TestController = require('../app/sockets/TestController.js')

module.exports = function (app) {

  const httpServer = require('http').createServer(app)
  const io         = require('socket.io')(httpServer) 

  /*
  *  Так вы можете указать способ транспортировки данных в сокетах на выбор - ['polling', 'websocket'],
  *  By default, a long-polling connection is established first, then upgraded to "better" transports (like WebSocket) - From Socket.IO Docs
  */
  // io.set('transports', ['websocket']);

  // saving socket into global for using it everywhere in app
  // example: global.socketIo.emit('some_event')
  global.socketIo = io.sockets

  // Pass socket state "socket" to controllers
  io.sockets.on('connection', (socket) => TestController.set(socket))

  httpServer.listen(PORT, () => {
    console.log(colors.cyan.bold('Sockets') + ' is running on port: ' + colors.cyan.bold(PORT))
  })
}
