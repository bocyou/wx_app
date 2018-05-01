const Sequelize = require('sequelize');

const config = require('../config');


const db = new Sequelize('shop', config.mysql.user, config.mysql.pass, 
	{ host:config.mysql.host, dialect:'mysql'}
	);


db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db




