const mysql = require('mysql');

const config = require('../config');

function query(sql){

	var connection = mysql.createConnection({
		host : config.mysql.host,
		port : config.mysql.port,
		user : config.mysql.user,
		password : config.mysql.pass,
		database : 'shop'
	});

	connection.connect();

	connection.query(sql, function (error, result) {
			return sql;

  		if (error) {
  			return 'nimeia';
  			return error;
  		}
  		if (result) {
  			return 'laji';
  			return result;	
  		} else {
  			return 'fuck';
  		}

	});
	connection.end();

}

module.exports = {
	query
}
