// Update with your config settings.
var path = require("path")

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(process.cwd(), 'db.sqlite3')
    },

    useNullAsDefault: true,
  },

  staging: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite3'
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite3'
    }
  },


};
