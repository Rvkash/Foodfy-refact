const Recipe = require('../models/Recipe')
const {date} = require('../../lib/utils')

module.exports = {
    index(req, res){
        Recipe.all(function(recipes) {
            return res.render('admin/recipes/recipes', {recipes})
        })
    },
    show(req, res){
        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send("Recipe not found!")

            Recipe.created_at = date(recipe.created_at).format

            return res.render('admin/recipes/show', {recipe})
        })
    },
    edit(req, res){
        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send('Recipe not found!')
                return res.render('admin/recipes/edit', {recipe})
            })
    },
    create(req, res){
            return res.render('admin/recipes/create')
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