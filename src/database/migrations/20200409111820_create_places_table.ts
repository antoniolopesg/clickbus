import * as Knex from 'knex';

export async function up(knex: Knex) {
  const exists = await knex.schema.hasTable('places');

  if (!exists) {
    return knex.schema.createTable('places', (tableBuilder) => {
      tableBuilder.increments();
      tableBuilder.string('name').notNullable();
      tableBuilder.string('slug').notNullable();
      tableBuilder.string('city').notNullable();
      tableBuilder.string('state').notNullable();
      tableBuilder.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists('places');
}
