import knex from 'knex';
import databaseConfig from '../../knexfile';

const databaseEnv =
  process.env.NODE_ENV === 'test'
    ? databaseConfig.test
    : databaseConfig.development;

export default knex(databaseEnv);
