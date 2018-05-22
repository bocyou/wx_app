/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */

async function add_cart(ctx, next) {
	cart_query = ctx.request.query

	user_id = cart_query.user_id
	goods_id = cart_query.goods_id
	goods_number = cart_query.goods_number

	//获取商品信息
	goods_model = require('../models/goods')
	goods_info = await goods_model.get_goods_info(goods_id)

	console.log(goods_info)
	cart_where = {'user_id': user_id, 'goods_id': goods_info.id}
	cart_model = require('../models/cart')
	cart_info = await cart_model.get_cart_info(cart_where)

	if (cart_info) {
		//更新
		goods_number = parseInt(cart_info.goods_number) + parseInt(goods_number)
		update_data = {
			'goods_number': goods_number,
			'goods_name': goods_info.goods_name,
			'goods_price': goods_info.goods_price
		}
		update_where = {'id': cart_info.id}
		update_result = await cart_model.edit_cart(update_data, update_where)
		if (update_result) {
			ctx.body = {'code':200, 'message':'添加成功'}
		} else {
			ctx.body = {'code':500, 'message':'添加失败'}
		}
	} else {
		//添加
		cart_data = {
			'user_id': user_id,
			'shop_id': 1,
			'goods_name': goods_info.goods_name,
			'goods_price': goods_info.goods_price,
			'goods_id': goods_info.id,
			'goods_number': goods_number,
			'add_time': Math.round(Date.now() / 1000)	
		}

		add_result = await cart_model.add_cart(cart_data)
		if (add_result) {
			ctx.body = {'code':200, 'message':'添加成功'}
		} else {
			ctx.body = {'code':500, 'message':'添加失败'}
		}
	}

}



async function edit_cart(ctx, next) {
	cart_id = ctx.request.query.cart_id
	goods_number = ctx.request.query.goods_number

	//先添加商品
	cart_info = {
		'goods_number': goods_number
	}

	where = {'id': cart_id}
	//更新相册表goods_id字段

	cart_model = require('../models/cart')
	edit_result = await cart_model.edit_cart(cart_info, where)

	console.log(edit_result)
  	if(edit_result){
  		ctx.body = {'code':200, 'message':'编辑成功'}
  	}else{
  		ctx.body = {'code':500, 'message':'编辑失败'}
  	}
}


async function del_cart(ctx, next) {
	cart_id = ctx.request.query.cart_id
	user_id = ctx.request.query.user_id

	if (user_id > 0) {
		where = {'user_id': user_id}		
	} else if (cart_id > 0) {
		where = {'id': cart_id}
	} else {
		ctx.body = {'code':400, 'message': '参数为空'}	
	}
	
	cart_model = require('../models/cart')
	del_result = await cart_model.del_cart(where)
	console.log(del_result)
	if (del_result) {
		ctx.body = {'code':200, 'message': '删除成功'}			
	} else {
		ctx.body = {'code':500, 'message': '删除失败'}	
	}

}


async function get_cart_list(ctx, next) {
	user_id = ctx.request.query.user_id

	cart_model = require('../models/cart')
	cart_list = await cart_model.get_cart_list_join_goods(user_id, 0, 20)

  	ctx.body = {'code':200, 'data': cart_list}

}


module.exports = {
  add_cart,
  edit_cart,
  del_cart,
  get_cart_list
}
