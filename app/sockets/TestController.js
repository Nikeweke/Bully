/*
*   TestController.js
*
*   Test Socket
*/


const colors      = require('colors')

module.exports = {
  // holds connected users
  users: [],

	/**
	 * Setting socket
	 * @param {Object} socket 
	 */
	set (socket) {
		this.onConnect(socket)

		// register event handlers
		socket.on('disconnect',   ()     => this.onDisconnect(socket))
		socket.on('custom_event', (data) => this.onCustomnEvent(data))
  },
  
  /**
	 * onCustomnEvent handler
	 * @param {Object} socket 
	 */
  onCustomnEvent (data) {
    console.log('Custom event triggered', data)
  },

	/**
	 * onConnect handler
	 * @param {Object} socket 
	 */
	onConnect (socket) {
		socket.id = this.getRandNumbers(0, 10000) 
		this.users.push(socket)
		console.log('+New user'.green.bold + ` is connected (userID = ${socket.id}) (users online - ${this.users.length})`)
		// console.log(users.length)
	},

	/**
	 * onDisconnect handler
	 * @param {Object} socket 
	 */
	onDisconnect (socket) {
		console.log('-User'.red.bold + ` is diconnected (userID = ${socket.id}) (users online - ${this.users.length})`)
  },
  
  /**
	 * Returns rand number 
	 * @param {Int} min
	 * @param {Int} max
	 * @return {Int} 
	 */
	getRandNumbers (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}


}

