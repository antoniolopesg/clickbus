import knex from 'knex';
import databaseConfig from '../../knexfile';

let databaseEnv = null;

switch (process.env.NODE_ENV) {
  case 'development':
    databaseEnv = databaseConfig.development;
    break;
  case 'test':
    databaseEnv = databaseConfig.test;
    break;
  default:
    databaseEnv = databaseConfig.production;
}

export default knex(databaseEnv);
