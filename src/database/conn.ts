import knex from 'knex';
import databaseConfig from '../../knexfile';

const databaseEnv =
  process.env.NODE_ENV !== 'test'
    ? databaseConfig.development
    : databaseConfig.test;

export default knex(databaseEnv);
