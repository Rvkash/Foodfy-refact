const {Pool} = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: '12345',
    host: 'localhost',
    port: 5432,
    database: 'foodfy'
})