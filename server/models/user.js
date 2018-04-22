const db = require('../lib/db');

function get_user_list(){
	// return 'from user modle';
	return db.query('select * from goods');

}


module.exports = {
	get_user_list
}

