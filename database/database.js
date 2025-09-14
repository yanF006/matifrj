/*var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'gondola.proxy.rlwy.net',
      user : 'root',
      password : 'SYRagnIJzgVgvtKEVSPThnCpvyOVOeuW',
      database : 'matifrjbd',
      port: 30431,
      protocol: 'tcp',
    }
  });

module.exports = knex;*/
var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user: 'root',
      password: '12345678',
      database: 'matifrjBD',
    }
  });
module.exports = knex;