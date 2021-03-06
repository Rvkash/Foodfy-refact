const express = require('express')
const home = require('./app/controllers/homeController')
const recipesController = require('./app/controllers/recipesController')
const chefs = require('./app/controllers/chefsController')
const multer = require('./app/middlewares/multer')

// GET    get resource (abstract or real)
// POST   create or save
// PUT    update resource
// EDIT   edit
// DELETE delete resource

const routes = express.Router()

// Home
routes.get('/', home.index)
routes.get('/recipes', home.recipes)
routes.get('/chefs', home.chefs)
routes.get('/search', home.search)
routes.get('/about', home.about)
routes.get('/chefs/:id', home.show)
routes.get('/infoRecipes/:id', home.infoRecipes)

// Admin
routes.get('/admin/recipes', recipesController.index)
routes.get('/admin/recipes/create', recipesController.create)
routes.get('/admin/recipes/:id', recipesController.show)
routes.get('/admin/recipes/:id/edit', recipesController.edit)

routes.post('/admin/recipes', multer.array('photos', 5), recipesController.post)
routes.put('/admin/recipes', multer.array('photos', 5), recipesController.put)
routes.delete('/admin/recipes', recipesController.delete)

// Chefs
routes.get('/admin/chefs', chefs.index)
routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)

routes.post('/admin/chefs', chefs.post)
routes.put('/admin/chefs', chefs.put)
routes.delete('/admin/chefs', chefs.delete)

module.exports = routes
