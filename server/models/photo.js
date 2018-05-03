
const db = require('../lib/db');

const Sequelize = require('sequelize');

var Photo = db.define(
	'goods_photos', 
	{  
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true		
		},	
	  	goods_id: {
	  		type: Sequelize.INTEGER,
	  		validate: {
	  			notEmpty: true
	  		}
	  	},  
	  	goods_path: {
	  		type: Sequelize.STRING,
	  		validate: {
	  			notEmpty: true
	  		}
	  	}, 
	  	is_cover: {
	  		type: Sequelize.INTEGER
	  	},
	  	sort: {
	  		type: Sequelize.INTEGER
	  	}
	},
	{
		freezeTableName: true,
		timestamps: false
	}
)


function add_photo(values)
{
	return Photo.create(values);
}


function edit_photo(values, where)
{
	return Photo.update(values, {
			where: where
		});
	
}


function del_photo(where)
{
	return Photo.destroy({
		where: where
	});
	
}


function get_photo_list(where, offset = 0, limit = 20)
{
	return Photo.findAll({
		where: where,
		offset: offset,
		limit: limit
	});
	
}


module.exports = {
	add_photo,
	edit_photo,
	del_photo,
	get_photo_list
}

