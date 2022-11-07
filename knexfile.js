require('dotenv').config('../.env')

module.exports = {
  client: "pg",
  connection: process.env.DATABASE,
  pool: { min: 2, max: 10 },
  migrations: {
    tableName: 'knex_migrations',
    directory: __dirname + '/knex/migrations'
  },
  seeds: {
    directory: __dirname + '/knex/seeds'
  }
};  
