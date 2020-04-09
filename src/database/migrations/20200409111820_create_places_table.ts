import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  const exists = await knex.schema.hasTable('places');

  if(!exists){
    return knex.schema.createTable('places', (tableBuilder) => {
      tableBuilder.increments();
      tableBuilder.string('name').notNullable();
      tableBuilder.string('slug').notNullable();
      tableBuilder.string('city').notNullable();
      tableBuilder.string('state').notNullable();
      tableBuilder.timestamps();
    });
  }
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('places');
}

