const express = require('express')
const nunjucks = require('nunjucks')
const methodOverride = require('method-override')

const routes = require('./routes')
const server = express()

server.set('view engine', 'njk')
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

nunjucks.configure('src/app/views', {
  express: server,
  noCache: true
})

server.listen(5003, function () {
  console.log('Server online')
})
