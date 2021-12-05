/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Autori: Kristian Kovac (xkovac61)
 *
 */

exports.up = function (knex) {
  knex.raw('PRAGMA foreign keys = ON;');

  return knex.schema
    .createTable('song', function (table) {
      table.increments('id');
      table.integer('username').unsigned();
      table.string('name', 255).notNullable();
      table.string('artist', 255).notNullable();
      table.string('album', 255).notNullable();
      table.string('path', 255).notNullable();
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("song")
};
