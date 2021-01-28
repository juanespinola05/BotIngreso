const Discord = require("discord.js");
const config = require("../json/config.json");
const mysql = require("mysql");

module.exports = {
    name: "dbconnection",
    run: async () => {
        return new Promise((res, rej) => {
            //conexión con DB
            var connection = mysql.createConnection({
                host: config.db.host,
                user: config.db.username,
                password: config.db.password,
                database: config.db.database,
                port: config.db.port
            });
            connection.connect(function(error){
                if(error){
                    console.log(error);
                    rej("Ha ocurrido un error");
                }else{
                    console.log('[dbconnection.js] Conexion correcta.');
                    return res(connection);
                }
            })
        });
    }
}