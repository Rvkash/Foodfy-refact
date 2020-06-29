const express = require('express')
const nunjucks = require('nunjucks')

const recipesData = require('./data.js')

const server = express()

server.use(express.static('public'))
server.set('view engine', 'njk')

nunjucks.configure('views', {
  express: server,
  noCache: true
})

server.get('/', function (req, res) {
  return res.render('index', {
    items: recipesData
  })
})

server.get('/about', function (req, res) {
  return res.render('about')
})

server.get('/recipes', function (req, res) {
  return res.render('recipes', {
    items: recipesData
  })
})

// params

server.get('/recipes/:index', function (req, res) {
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

server.listen(5000, function () {
  console.log('Server online')
})
