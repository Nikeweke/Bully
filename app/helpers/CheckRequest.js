/*
*   CheckRequest.js
*
*   Request helper functions
*/

module.exports = {

 /*
  |--------------------------------------------------------------------------
  | Provides info about your request
  |--------------------------------------------------------------------------
  */
  Check (req, res) {
    res.send({
      Method: req.method,
      Body: req.body,
      Params: req.params,
      Query: req.query,
      'Content-type (Request)': req.headers['content-type']
    })
  }
  
}
  