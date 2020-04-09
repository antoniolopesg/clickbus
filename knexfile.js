require('ts-node').register();
require('dotenv').config();
const { resolve } = require('path');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      database: process.env.PG_DATABASE,
      user:     process.env.PG_USER,
      password: process.env.PG_PASS
    },
    pool: {
      min: process.env.PG_POOL_MIN || 2,
      max: process.env.PG_POOL_MAX || 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
  }
};
