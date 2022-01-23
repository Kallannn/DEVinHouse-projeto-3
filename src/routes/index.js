const express = require('express')
const multer = require('multer')
const routes = express.Router()
const upload = multer()
const userController = require('../controllers/userController')
const financeController = require('../controllers/financeController')
const req = require('express/lib/request')

routes.get('/users', userController.index)
routes.get('/user/:id', userController.indexOne)
routes.post('/users', userController.create)
routes.patch('/user/:id', userController.updateOne)
routes.delete('/user/:id', userController.deleteOne)
routes.post('/user/:userId/finance',upload.single("file"), financeController.create)
routes.delete('/user/:userId/finance/:financeId', financeController.delete)
routes.get('/user/:userId/finance', financeController.getTotalExpenses_CurrentMonthAndYear)

module.exports = routes
