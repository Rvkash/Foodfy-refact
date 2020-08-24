const recipesData = require('../../../public/scripts/data')
const main = require ('../models/Main')

exports.home = function (req, res) {
  return res.render('main/index', {
    items: recipesData
  })
}

exports.about = function (req, res) {
  return res.render('main/about')
}

exports.recipes = function (req, res) {
  return res.render('main/recipes', {
    items: recipesData
  })
},

exports.details = function (req, res) { // params
  const index = req.params.index

  const recipe = recipesData.find(function (recipe) {
    if (recipesData[index]) {
      return true
    }
  })

  if (!recipe) {
    return res.send('Recipe not found!')
  }

  return res.render('main/infoRecipes', {
    recipe: recipesData[index]
  })
}
