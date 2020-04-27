require('ts-node').register();
require('dotenv').config();
const { resolve } = require('path');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.PG_DEV_HOST,
      port: parseInt(process.env.PG_DEV_PORT, 10),
      database: process.env.PG_DEV_DATABASE,
      user: process.env.PG_DEV_USER,
      password: process.env.PG_DEV_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve(__dirname, 'src', 'database', 'migrations'),
    },
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './__tests__/database.sqlite',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve(__dirname, 'src', 'database', 'migrations'),
    },
    useNullAsDefault: false,
  },
  production: {
    client: 'postgresql',
    connection: {
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT, 10),
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve(__dirname, 'src', 'database', 'migrations'),
    },
  },
};
