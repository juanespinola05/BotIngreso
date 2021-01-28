// const Discord = require("discord.js");
const keysDB = require('./../keys.json');
const mysql = require('mysql');

module.exports = {
	name: 'dbconnection',
	run: async () => {
		return new Promise((res, rej) => {
			// conexión con DB
			const connection = mysql.createConnection({
				host: keysDB.db.host,
				user: keysDB.db.username,
				password: keysDB.db.password,
				database: keysDB.db.database,
				port: keysDB.db.port,
			});
			connection.connect(function(error) {
				if (error) {
					console.log(error);
					rej('Ha ocurrido un error');
				}
				else {
					console.log('[dbconnection.js] Conexion correcta.');
					return res(connection);
				}
			});
		});
	},
};
