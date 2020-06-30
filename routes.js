const express = require('express')
const main = require('./controllers/main')
const routes = express.Router()

routes.get('/', main.home)
routes.get('/about', main.about)
routes.get('/recipes', main.recipes)
routes.get('/recipes/:index', main.details)

module.exports = routes
