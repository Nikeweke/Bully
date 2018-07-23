/*
*   api.js
*
*   API Routes
*
*/
const express = require('express')
const router  = express.Router()

// you can apply middleware to this all routes
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

router.all('/check', (req, res) => res.send({ message: 'That is API, Hello from Bullz' }));

module.exports = router

