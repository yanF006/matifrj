var knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'dpg-d0tgo7e3jp1c73ej952g-a.oregon-postgres.render.com',
      user : 'root',
      password : 'NxlJb8dTaexSTGmPMKVzxQGNj8NYn8YY',
      database : 'matifrj',
      port: 5432,
      ssl: true
    }
  });

module.exports = knex