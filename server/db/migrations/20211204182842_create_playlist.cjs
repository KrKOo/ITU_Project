/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Autori: Kristian Kovac (xkovac61)
 *
 */

exports.up = function (knex) {
  knex.raw('PRAGMA foreign keys = ON;');
  return knex.schema
    .createTable('playlist', function (table) {
      table.increments('id');
      table.integer('userId').unsigned();
      table.string('name', 255).notNullable();
      table.string('imagePath', 255).notNullable();
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("playlist")
};
