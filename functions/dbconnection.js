const mysql = require('mysql');
require('dotenv').config();

module.exports = {
  name: 'dbconnection',
  run: async () => {
    return new Promise((res, rej) => {
      //conexión con DB
      var connection = mysql.createConnection({
        host: 'remotemysql.com',
        user: process.env.HEROKU_DB_USER,
        password: process.env.HEROKU_DB_PASS,
        database: process.env.HEROKU_DB_USER,
        port: 3306,
      });
      connection.connect(function (error) {
        if (error) {
          console.log(error);
          rej('Ha ocurrido un error');
        } else {
          console.log('[dbconnection.js] Conexion correcta.');
          return res(connection);
        }
      });
    });
  },
};
