const Home = require('../models/Home')

module.exports =  {
  index(req,res){
    Home.all(function(recipes){
      return res.render('home/index', {recipes})
    })
  },
  recipes(req,res){
    Home.all(function(recipes) {
      return res.render('home/recipes', {recipes})
    })
  },
  chefs(req,res){
    Home.allChefs(function(chefs){
      return res.render('home/chefs', {chefs})
    })
  },
  show(req,res) {
    Home.findChefs(req.params.id, function(chef) {
      if(!chef) return res.send('Chef not found!')

            Home.findChefTotalRecipes(chef.id, function(recipe){

                Home.findChefRecipes(chef.id, function(recipes){

                    chef.created_at = date(chef.created_at).format
        
                    return res.render('site/chefs/details', {chef, recipe, recipes})
                })
            })
        })
    },
  search(req, res) {
    const { filter } = req.query 

    Home.findByRecipes(filter, function(recipes){
      return res.render('home/search', {recipes, filter})
    })
  },
  about(req, res){
      return res.render('home/about')
  },
  infoRecipes(req, res){
     Home.findRecipes(req.params.id, function(recipe){
          if(!recipe) return res.send('Recipe not found!')

          return res.render('home/infoRecipes', {recipe})
      })
   }
}