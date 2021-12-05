
exports.up = function (knex) {
  knex.raw('PRAGMA foreign keys = ON;');

  return knex.schema
    .createTable('playlistSong', function (table) {
      table.increments('id');
      table.integer('playlistId').notNullable();
      table.integer('songId').notNullable();
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("playlistSong")
};
