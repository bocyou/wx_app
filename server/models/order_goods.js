
const db = require('../lib/db');

const Sequelize = require('sequelize');

var OrderGoods = db.define(
	'order_goods', 
	{  
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true	
		},	
	  	order_id: {
	  		type: Sequelize.INTEGER
	  	},  
	  	goods_id: {
	  		type: Sequelize.INTEGER
	  	},  
	  	goods_name: {
	  		type: Sequelize.STRING,
	  		validate: {
	  			notEmpty: true
	  		}
	  	},  
	  	goods_number: {
	  		type: Sequelize.INTEGER
	  	}, 
	  	goods_price: {
	  		type: Sequelize.DOUBLE(5,2)
	  	}
	},
	{
		freezeTableName: true,
		timestamps: false
	}
)


function add_order_goods(values)
{
	return	OrderGoods.create(values)
}


function get_order_goods_list(where, offset = 0, limit = 20)
{
	return OrderGoods.findAll({
		where: where,
		offset: offset,
		limit: limit
	});
	
}


module.exports = {
	add_order_goods,
	get_order_goods_list
}

