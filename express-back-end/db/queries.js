const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'vesseldb',
  password: 'password',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const findUserByEmail = (email) => {
  let user;
  return new Promise ((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if (results.rows.length === 0) {
        reject('oh no! you are not registered')
      }
      for (let i = 0; i < results.rows.length; i++) {
        let user = results.rows[i];
        resolve(user);
      }
    })
  })
}

module.exports = {
    getUsers,
    getUserById,
    findUserByEmail,
}