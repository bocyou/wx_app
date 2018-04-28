
const db = require('../lib/db');

const Sequelize = require('sequelize');

var User = db.define('user', {  
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true	
	},	
  	username: {
  		type: Sequelize.STRING
  	},  
  	password: {
  		type: Sequelize.STRING
  	}  
},
	{
		freezeTableName: true,
		timestamps: false
	}
)

 function get_user_list()
{
	return User.findAll();
	// return connection.query(sql);

	// console.log(daaa);
	// connection.query(sql, function (error, result) {
 //  		if (error) {
 //  			return callback(error ,result);
 //  		}

 //  		return callback(null, result);  		

	// });
	
}


module.exports = {
	get_user_list
}

