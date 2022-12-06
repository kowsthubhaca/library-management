const Pool = require('pg').Pool
const pool = new Pool({
  user: 'scholar',
  host: 'localhost',
  database: 'library',
  password: 'password',
  port: 5432,
})

module.exports = pool;