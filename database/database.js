var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '12345678',
      database : 'matifrj'
    }
  });

module.exports = knex