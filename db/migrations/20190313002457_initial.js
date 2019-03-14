exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('vitamins', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('treatment_id').unsigned()
      table.foreign('treatment_id')
        .references('treatments.id');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('treatments', function(table) {
      table.increments('id').primary();
      table.string('uses');
      table.string('side_effects');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('vitamins'),
    knex.schema.dropTable('treatments')
  ]);
};