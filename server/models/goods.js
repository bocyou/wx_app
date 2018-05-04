
const db = require('../lib/db');

const Sequelize = require('sequelize');

var Goods = db.define(
	'goods', 
	{  
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true	
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
	return	Goods.create(values)
}


function edit_goods(values, where)
{
	if (where) {
		return Goods.update(values, {where: where})
	} else {
		return false
	}
	
}


function del_goods(where)
{
	return Goods.destroy({
		where: where
	});
	
}


function get_goods_info(goods_id)
{
	return Goods.findById(goods_id);
	
}


function get_goods_list(where, offset = 0, limit = 20)
{
	return Goods.findAll({
		where: where,
		offset: offset,
		limit: limit
	});
	
}


module.exports = {
	add_goods,
	edit_goods,
	del_goods,
	get_goods_info,
	get_goods_list

}

