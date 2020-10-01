const express = require('express')
const main = require('./app/controllers/main')
const recipes = require('./app/controllers/admin')
const chefs = require('./app/controllers/chefs')

// GET    get resource (abstract or real)
// POST   create or save
// PUT    update resource
// EDIT   edit
// DELETE delete resource

const routes = express.Router()

// Main
routes.get('/', main.home)
routes.get('/about', main.about)
routes.get('/recipes', main.recipes)
routes.get('/recipes/:index', main.details)

// Admin
routes.get('/admin/recipes', recipes.index)
routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)

routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
routes.delete('/admin/recipes', recipes.delete)

// Chefs 
routes.get('/admin/chefs', chefs.index)
routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)


routes.post('/admin/chefs', chefs.post)
routes.put('/admin/chefs', chefs.put)
routes.delete('/admin/chefs', chefs.delete)


module.exports = routes
