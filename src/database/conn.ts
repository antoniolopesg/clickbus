import databaseConfig from '../../knexfile';
import knex from 'knex';

const databaseEnv = process.env.NODE_ENV === 'test'
?
databaseConfig.test
:
databaseConfig.development;

export default knex(databaseEnv);