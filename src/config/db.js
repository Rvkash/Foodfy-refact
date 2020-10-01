<<<<<<< HEAD
const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: 12345,
    host: "localhost",
    port: 5432,
    database: "foodfy"
})  

=======
const {Pool} = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: '12345',
    host: 'localhost',
    port: 5432,
    database: 'foodfy'
})
>>>>>>> 2b1cf99f0bc91a6c1253a7d4da18ccd4f5220512
