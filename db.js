const {Pool} = require('pg');

const pool = new Pool({
    user: 'joshzigler',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'test'
})

module.exports = pool;