const Recipe = require('../models/Recipe')

module.exports = {
    index(req, res){
        Recipe.all(function(recipes) {
            return res.render('admin/recipes/recipes', {recipes})
        })
    },
    show(req, res){
        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send("Recipe not found!")

            
            return res.render('admin/recipes/show', {recipe})
        })
    },
    edit(req, res){
        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send('Recipe not found!')

                Recipe.chefsSelectOptions(function(options){
                    return res.render('admin/recipes/edit', {recipe, chefOptions: options})
            })
        })
    },
    create(req, res){
        Recipe.chefsSelectOptions(function(options) {  
            return res.render('admin/recipes/create', {chefOptions: options})

        })
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == '') {
                return res.send('Please, fill all the fields!')
            }
        }
        

        Recipe.create(req.body, function(recipe) {
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == '') {
                return res.send('Please, fill all the fields!')
            }
        }

        Recipe.update(req.body, function() {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },
    delete(req, res){
        Recipe.delete(req.body.id, function() {
            return res.redirect(`/admin/recipes`)
        })
    }
}