const {Client} = require('pg')

const client = new Client({
  user: 'joshzigler',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'test'
})

client.connect()
.then(() => console.log('connected successfuly'))
.then(() => client.query("select id, name from products where id < $1", [5]))
.then((results) => console.table(results.rows))
.catch(err => console.log(err))
.finally(() => client.end())