
const db = require('../lib/db');

const Sequelize = require('sequelize');

var User = db.define(
  'user', 
  {  
  	id: {
  		type: Sequelize.INTEGER,
  		primaryKey: true,
  		autoIncrement: true		
  	},	
  	open_id: {
  		type: Sequelize.STRING	
  	},
  	username: {
  		type: Sequelize.STRING
  	},  
  	password: {
  		type: Sequelize.STRING
  	},
  	shop_id: {
  		type: Sequelize.INTEGER
  	},
  	status: {
  		type: Sequelize.INTEGER
  	},
  	last_login_time: {
  		type: Sequelize.INTEGER
  	},
  	last_login_ip: {
  		type: Sequelize.STRING
  	},
  	sex: {
  		type: Sequelize.INTEGER
  	},
  	secret_key: {
  		type: Sequelize.STRING
  	},
    session_key: {
      type: Sequelize.STRING
    },
  	add_time: {
  		type: Sequelize.INTEGER
  	}  

  },
	{
		freezeTableName: true,
		timestamps: false
	}
)

 function get_user_list()
{
	return User.findAll()
	// return connection.query(sql);

	// console.log(daaa);
	// connection.query(sql, function (error, result) {
 //  		if (error) {
 //  			return callback(error ,result);
 //  		}

 //  		return callback(null, result);  		

	// });
	
}

function add_user(values)
{
	return	User.create(values)
}

function get_user_info(where)
{
	return User.findOne({
		where: where
	})
}


module.exports = {
	add_user,
	get_user_info,
	get_user_list
}

