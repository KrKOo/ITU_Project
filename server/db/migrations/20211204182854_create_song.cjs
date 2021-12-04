exports.up = function (knex) {
  knex.raw('PRAGMA foreign keys = ON;');

  return knex.schema
    .createTable('song', function (table) {
      table.increments('id');
      table.integer('ownerID').unsigned();
      table.string('name', 255).notNullable();
      table.string('genere', 255).notNullable();
      table.string('path', 255).notNullable();

      table.foreign('ownerID').references('users.id');

    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("song")
};
