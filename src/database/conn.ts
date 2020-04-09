import databaseConfig from '../../knexfile';
import knex from 'knex';

export default knex(databaseConfig.development);