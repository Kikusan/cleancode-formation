import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('bookings', function (t) {
      t.uuid('id').primary();
      t.uuid('traveller_id').notNullable();
      t.string('start_point').notNullable();
      t.string('end_point').notNullable();
      t.decimal('price').notNullable();
    })
    .createTable('travellers', function (t) {
      t.uuid('id').primary();
      t.date('birth_date').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('bookings').dropTable('travellers');
}
