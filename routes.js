const express = require('express')
const recipesData = require('./data.js')
const routes = express.Router()

routes.get('/', function (req, res) {
  return res.render('index', {
    items: recipesData
  })
})

routes.get('/about', function (req, res) {
  return res.render('about')
})

routes.get('/recipes', function (req, res) {
  return res.render('recipes', {
    items: recipesData
  })
})

// params

routes.get('/recipes/:index', function (req, res) {
  const index = req.params.index

  const recipe = recipesData.find(function (recipe) {
    if (recipesData[index]) {
      return true
    }
  })

  if (!recipe) {
    return res.send('Recipe not found!')
  }

  return res.render('infoRecipes', {
    recipe: recipesData[index]
  })
})

module.exports = routes
