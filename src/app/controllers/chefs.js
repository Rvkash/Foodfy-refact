const Chef = require('../models/Chef')
const {date} = require('../../lib/utils')

module.exports = {
    index(req, res){
        Chef.all(function(Chefs) {
            return res.render('admin/chefs/chefs', {Chefs})
        })
    },
    show(req, res){
        Chef.find(req.params.id, function(Chef) {
            if(!Chef) return res.send("Chef not found!")

            Chef.created_at = date(Chef.created_at).format

            return res.render('admin/chefs/show', {Chef})
        })
    },
    edit(req, res){
        Chef.find(req.params.id, function(Chef) {
            if(!Chef) return res.send('Chef not found!')
                return res.render('admin/chefs/edit', {Chef})
            })
    },
    create(req, res){
            return res.render('admin/chefs/create')
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == '') {
                return res.send('Please, fill all the fields!')
            }
        }

        Chef.create(req.body, function(Chef) {
            return res.redirect(`/admin/chefs/${Chef.id}`)
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == '') {
                return res.send('Please, fill all the fields!')
            }
        }

        Chef.update(req.body, function() {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete(req, res){
        Chef.delete(req.body.id, function() {
            return res.redirect(`/admin/chefs`)
        })
    }
}