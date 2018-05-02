
const db = require('../lib/db');

const Sequelize = require('sequelize');

var Goods = db.define(
	'goods', 
	{  
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true	
		},	
	  	goods_sn: {
	  		type: Sequelize.STRING,
	  		validate: {
	  			notEmpty: true
	  		}
	  	},  
	  	goods_name: {
	  		type: Sequelize.STRING,
	  		validate: {
	  			notEmpty: true
	  		}
	  	},  
	  	goods_tag: {
	  		type: Sequelize.INTEGER
	  	},
	  	goods_description: {
	  		type: Sequelize.STRING,
	  		validate: {
	  			notEmpty: true
	  		}
	  	},
	  	goods_price: {
	  		type: Sequelize.DOUBLE(5,2)
	  	},
	  	goods_img_url: {
	  		type: Sequelize.STRING
	  	},
	  	shop_id: {
	  		type: Sequelize.INTEGER,
	  		isInt: true,
	  	},
		status: {
	  		type: Sequelize.INTEGER,
	  		isInt: true,
	  	},
	  	add_time: {
	  		type: Sequelize.INTEGER,
	  		isInt: true,
	  	},
	},
	{
		freezeTableName: true,
		timestamps: false
	}
)


function add_goods(values)
{
	return Goods.create(values);
}


function get_goods_list(where)
{
	return Goods.findAll({
		where: where
	});
	
}


module.exports = {
	add_goods,
	get_goods_list
}

