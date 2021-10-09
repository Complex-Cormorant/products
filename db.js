const {user, password, host} = require('./config.js');
const {Pool} = require('pg');

const pool = new Pool({
    user: user,
    password: password,
    host: host,
    port: 5432,
    database: 'test',
    max: 25
});

module.exports = pool;