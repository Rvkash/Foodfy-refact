<<<<<<< HEAD
const Chef = require('../models/Chef')
const {date} = require('../../lib/utils')
=======
const {date} = require('../lib/format')
const Chef = require('../models/Chefs')
>>>>>>> 2b1cf99f0bc91a6c1253a7d4da18ccd4f5220512

module.exports = {
    index(req, res){
        Chef.all(function(Chefs) {
<<<<<<< HEAD
            return res.render('admin/chefs/chefs', {Chefs})
=======
            return res.render('admin/Chefs/Chefs', {Chefs})
>>>>>>> 2b1cf99f0bc91a6c1253a7d4da18ccd4f5220512
        })
    },
    show(req, res){
        Chef.find(req.params.id, function(Chef) {
            if(!Chef) return res.send("Chef not found!")

            Chef.created_at = date(Chef.created_at).format

<<<<<<< HEAD
            return res.render('admin/chefs/show', {Chef})
=======
            return res.render('admin/Chefs/show', {Chef})
>>>>>>> 2b1cf99f0bc91a6c1253a7d4da18ccd4f5220512
        })
    },
    edit(req, res){
        Chef.find(req.params.id, function(Chef) {
            if(!Chef) return res.send('Chef not found!')
<<<<<<< HEAD
                return res.render('admin/chefs/edit', {Chef})
            })
    },
    create(req, res){
            return res.render('admin/chefs/create')
=======
                return res.render('admin/Chefs/edit', {Chef})
            })
    },
    create(req, res){
            return res.render('admin/Chefs/create')
>>>>>>> 2b1cf99f0bc91a6c1253a7d4da18ccd4f5220512
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for(let key of keys) {
            if(req.body[key] == '') {
                return res.send('Please, fill all the fields!')
            }
        }

        Chef.create(req.body, function(Chef) {
<<<<<<< HEAD
            return res.redirect(`/admin/chefs/${Chef.id}`)
=======
            return res.redirect(`/admin/Chefs/${Chef.id}`)
>>>>>>> 2b1cf99f0bc91a6c1253a7d4da18ccd4f5220512
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
<<<<<<< HEAD
            return res.redirect(`/admin/chefs/${req.body.id}`)
=======
            return res.redirect(`/admin/Chefs/${req.body.id}`)
>>>>>>> 2b1cf99f0bc91a6c1253a7d4da18ccd4f5220512
        })
    },
    delete(req, res){
        Chef.delete(req.body.id, function() {
<<<<<<< HEAD
            return res.redirect(`/admin/chefs`)
=======
            return res.redirect(`/admin/Chefs`)
>>>>>>> 2b1cf99f0bc91a6c1253a7d4da18ccd4f5220512
        })
    }
}