var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'caboose.proxy.rlwy.net',
      user : 'root',
      password : 'kdHHqulrTmNNaUtbNpIJKmhfiRvKMhaA',
      database : 'matifrj',
      port: 49606,
      protocol: 'tcp',
    }
  });

module.exports = knex