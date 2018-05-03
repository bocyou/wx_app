/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
async function add_photo(ctx, next) {
	photo_query = ctx.request.body

	//测试数据
	photo_query = {
		'goods_id': 1,
		'goods_path': 'https://res.wx.qq.com/mpres/htmledition/images/mp_qrcode3a7b38.gif',
		'is_cover': 0,
		'sort': 0
	}

	photo_info = {
		'goods_id': photo_query.goods_id,
		'goods_path': photo_query.goods_path,
		'is_cover': photo_query.is_cover,
		'sort': photo_query.sort
	}

	photo_model = require('../models/photo')
	add_result = await photo_model.add_photo(photo_info)
  	if (add_result) {
  		ctx.body = {'code':200, 'message':'添加成功'}
  	} else {
  		ctx.body = {'code':500, 'message':'添加失败'}
  	}
}



async function edit_photo(ctx, next) {
	photo_query = ctx.request.body

	//测试数据
	photo_query = {
		'id': 2,
		'goods_id': 1,
		'goods_path': 'https://res.wx.qq.com/mpres/htmledition/images/mp_qrcode3a7b38.gif',
		'is_cover': 1,
		'sort': 0
	}

	photo_info = {
		'goods_id': photo_query.goods_id,
		'goods_path': photo_query.goods_path,
		'is_cover': photo_query.is_cover,
		'sort': photo_query.sort
	}

	where = {'id': photo_query.id}

	photo_model = require('../models/photo')
	edit_result = await photo_model.edit_photo(photo_info, where)
  	if (edit_result) {
  		ctx.body = {'code':200, 'message':'编辑成功'}
  	}else{
  		ctx.body = {'code':500, 'message':'编辑失败'}
  	}
}


async function del_photo(ctx, next) {
	id = ctx.request.query.id
	where = {'id': id}

	photo_model = require('../models/photo')
	del_result = await photo_model.del_photo(where)
	if (del_result) {
	 	ctx.body = {'code':200, 'message': '删除成功'}		
	} else {
		ctx.body = {'code':500, 'message': '删除失败'}
	}	
  	

}


async function get_photo_list(ctx, next) {
	goods_id = ctx.request.query.goods_id

	//测试数据
	where = {'goods_id': goods_id}

	photo_model = require('../models/photo')
	data = await photo_model.get_photo_list(where, 0, 20)

  	ctx.body = {'code':200, 'data': data}

}


module.exports = {
  add_photo,
  edit_photo,
  del_photo,
  get_photo_list
}
