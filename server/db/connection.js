/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Autori: Kristian Kovac (xkovac61)
 *
 */

import knex from 'knex'
import config from './knexfile.cjs'

const conn = knex({
  client: 'sqlite3',
  connection: {
    filename: 'db/db.sqlite3'
  },

  useNullAsDefault: true,
});

export default conn;
