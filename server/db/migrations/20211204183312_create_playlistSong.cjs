exports.up = function (knex) {
  knex.raw('PRAGMA foreign keys = ON;');

  return knex.schema
    .createTable('playlistSong', function (table) {
      table.increments('id');
      table.integer('songID').unsigned();
      table.integer('playlistID').unsigned();

      table.foreign('songID').references('song.id');
      table.foreign('playlistID').references('playlist.id');

    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("playlistSong")
};
