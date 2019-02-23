/*
*  Server launching
*
*  server.js
*/
const getRoutes = require('../app/helpers/Routes')
const colors    = require('colors')
const MODES = {
  dev:    { name: 'dev',   port: 8000,  color: 'yellow'  },
  prod:   { name: 'prod',  port: 80,    color: 'green'   },
}

module.exports = function (app) {
  // what is process.argv[...] ? Its catching parametrs from console that goes after "node app"
  // example: - node  app  <modeName>
  //            [0]   [1]  [2]
  let modeName = process.argv[2]

  // show routes
  if (modeName === 'routes') {
    console.log( getRoutes(app) )    
    process.exit(1)
  }

  // defining port
  let mode = modeName && modeName in MODES ? MODES[modeName] : MODES.dev 

  // launch server
  app.listen(mode.port, () => {
    // colorize message
    let coloredMsg = []
    for (let key of Object.keys(mode)) {
      coloredMsg.push(colors[mode.color](mode[key]))
    }
    coloredMsg[2] = colors[mode.color]('App')

    console.log(`${coloredMsg[2]} is running (${coloredMsg[0]} mode): http://localhost:${coloredMsg[1]}/`)
  })

  return app
}
