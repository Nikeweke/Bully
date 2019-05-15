/*
*   web.js
*
*   Web Routes
*
*/
const express = require('express')
const router  = express.Router()

// controllers
const IndexCtrl = require('../app/controllers/IndexController')
const CheckReq = require('../app/helpers/CheckRequest')

// middlewares
const checkRequest = require('./middleware/CheckRequest')
const middlewares = []

//  home page
router.get('/', middlewares, (res, req) => IndexCtrl.Index(res, req)) 

// test your request
router.all('/test', CheckReq)


module.exports = router
