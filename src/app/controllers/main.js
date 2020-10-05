const Main = require('../models/Main')

module.exports =  {
  index(req,res){
    Main.all(function(recipes){
      return res.render('main/index', {recipes})
    })
  },
  recipes(req,res){
    Main.all(function(recipes) {
      return res.render('main/recipes', {recipes})
    })
  },
  chefs(req,res){
    Main.allChefs(function(chefs){
      return res.render('main/chefs', {chefs})
    })
  },
  show(req,res) {
    Main.findChefs(req.params.id, function(chef) {
      if(!chef) return res.send('Chef not found!')

            Main.findChefTotalRecipes(chef.id, function(recipe){

                Main.findChefRecipes(chef.id, function(recipes){

                    chef.created_at = date(chef.created_at).format
        
                    return res.render('site/chefs/details', {chef, recipe, recipes})
                })
            })
        })
    },
  search(req, res) {
    const { filter } = req.query 

    Main.findByRecipes(filter, function(recipes){
      return res.render('main/search', {recipes, filter})
    })
  },
  about(req, res){
      return res.render('main/about')
  },
  infoRecipes(req, res){
     Main.findRecipes(req.params.id, function(recipe){
          if(!recipe) return res.send('Recipe not found!')

          return res.render('main/infoRecipes', {recipe})
      })
   }
}