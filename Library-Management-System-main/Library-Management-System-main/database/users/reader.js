const Pool = require('pg').Pool
const pool = new Pool({
  user: 'reader',
  host: 'localhost',
  database: 'library',
  password: 'pass123',
  port: 5432,
})

module.exports = pool;