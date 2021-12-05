/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Autori: Kristian Kovac (xkovac61)
 *
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('user', function (table) {
      table.increments('id');
      table.string('email', 255).notNullable();
      table.string('username', 255).notNullable();
      table.string('password', 255).notNullable();
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("user")
};
