exports.up = function (knex) {
  knex.raw('PRAGMA foreign keys = ON;');
  return knex.schema
    .createTable('playlist', function (table) {
      table.increments('id');
      table.integer('username').unsigned();
      table.string('name', 255).notNullable();
    })

};

exports.down = function (knex) {
  return knex.schema
    .dropTable("playlist")
};
