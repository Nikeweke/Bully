/** @module IndexController */

//  Models
// const userModel = require('../models/User');

module.exports = {

  // Home page
  Index (req, res) {
    let viewArgs = {
      greeting: 'Bully is greeting you!',
      words: 'Makes problems run'
    }
    res.render('index', viewArgs)
  },


  // info about request
  Test (req, res) {
    res.send({
      Method: req.method,
      Body: JSON.stringify(req.body),
      Params: JSON.stringify(req.params),
      Query: JSON.stringify(req.query),
      'Content-type (Request)': req.headers['content-type']
    })
  }

}
