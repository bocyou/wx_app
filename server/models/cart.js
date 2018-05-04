
const db = require('../lib/db');

const Sequelize = require('sequelize');

var Cart = db.define(
	'cart', 
	{  
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true	
		},	
	  	user_id: {
	  		type: Sequelize.INTEGER,
	  		isInt: true,
	  	},  
	  	shop_id: {
	  		type: Sequelize.INTEGER,
	  		isInt: true,
	  	},  
	  	goods_id: {
	  		type: Sequelize.INTEGER,
	  		isInt: true,
	  	},
	  	goods_name: {
	  		type: Sequelize.STRING
	  	},
	  	goods_price: {
	  		type: Sequelize.DOUBLE(5,2)
	  	},
	  	goods_number: {
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


function add_cart(values)
{
	return	Cart.create(values)
}


function edit_cart(values, where)
{
	if (where) {
		return Cart.update(values, {where: where})
	} else {
		return false
	}
	
}


function del_cart(where)
{
	return Cart.destroy({
		where: where
	});
	
}

function get_cart_info(where)
{
	return Goods.findOne(where);
	
}


function get_cart_list(where, offset = 0, limit = 20)
{
	return Cart.findAll({
		where: where,
		offset: offset,
		limit: limit
	});
	
}

function get_cart_list_join_goods(where, offset = 0, limit = 20)
{
	return db.query('SELECT cart.* FROM cart LEFT JOIN goods ON cart.goods_id = goods.id', { type: Sequelize.QueryTypes.SELECT})
	
}


module.exports = {
	add_cart,
	edit_cart,
	del_cart,
	get_cart_info,
	get_cart_list,
	get_cart_list_join_goods

}

