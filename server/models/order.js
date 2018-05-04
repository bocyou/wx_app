
const db = require('../lib/db');

const Sequelize = require('sequelize');

var Order = db.define(
	'order', 
	{  
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true	
		},	
	  	shop_id: {
	  		type: Sequelize.INTEGER
	  	},  
	  	user_id: {
	  		type: Sequelize.INTEGER
	  	},  
	  	user_name: {
	  		type: Sequelize.STRING
	  	},
	  	consignee: {
	  		type: Sequelize.STRING
	  	},
	  	address: {
	  		type: Sequelize.STRING
	  	},
	  	order_amount: {
	  		type: Sequelize.DOUBLE(7,2)
	  	},
	  	goods_amount: {
	  		type: Sequelize.DOUBLE(7,2)
	  	},
	  	remark: {
	  		type: Sequelize.STRING
	  	}
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


function add_order(values)
{
	return	Order.create(values)
}


function edit_order(values, where)
{
	if (where) {
		return Order.update(values, {where: where})
	} else {
		return false
	}
	
}


function get_order_info(order_id)
{
	return Order.findById(order_id);
	
}


function get_order_list(where, offset = 0, limit = 20)
{
	return Order.findAll({
		where: where,
		offset: offset,
		limit: limit
	});
	
}


module.exports = {
	add_order,
	edit_order,
	get_order_info,
	get_order_list

}

