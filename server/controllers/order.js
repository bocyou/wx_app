/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
async function submit_order(ctx, next) {
	// order_query = ctx.request.body

	//测试数据
	order_query = {
		'user_id': 1,
		'shop_id': 1,
		'user_name': '脉动',
		'consignee': '向动',
		'address': '深圳市福田区',
		'remark': '备注'
	}

	goods_amount = 100
	order_amount = 100

	//1.添加订单记录
	//2.添加订单商品记录

	//先添加商品
	order_info = {
		'user_id': order_query.user_id,
		'shop_id': order_query.shop_id,
		'user_name': order_query.user_name,
		'consignee': order_query.consignee,
		'address': order_query.address,
		'remark': order_query.remark,
		'order_amount': order_amount,
		'goods_amount': goods_amount,
		'status': 0,
		'add_time': Math.round(Date.now() / 1000)
	}
	//更新相册表goods_id字段

	order_model = require('../models/order')
	add_result = await order_model.add_order(order_info)
	order_id = add_result.id
	console.log('order_id = ' + add_result.id)
  	if (order_id) {
		//添加商品记录	
		cart_model = require('../models/cart')
		cart_list = await cart_model.get_cart_list_join_goods()

		console.log(cart_list)
		order_goods_model = require('../models/order_goods')
		cart_list.forEach(function(goods){
			goods_data = {
				'order_id': order_id,
				'goods_id': goods.goods_id,
				'goods_name': goods.goods_name,
				'goods_price': goods.goods_price,
				'goods_number': goods.goods_number			

			}
			console.log(goods_data)
			add_order_goods_result = order_goods_model.add_order_goods(goods_data)
			console.log(add_order_goods_result)
		})					

  		ctx.body = {'code':200, 'message':'添加成功'}
  	}else{
  		ctx.body = {'code':500, 'message':'添加失败'}
  	}
}


async function update_order(ctx, next) {
	order_query = ctx.request.body

	//测试数据
	order_query = {
		'order_id': 15,
		'status': 2
	}

	//先添加商品
	order_info = {
		'status': order_query.status
	}

	where = {'id': order_query.order_id}
	//更新相册表goods_id字段

	order_model = require('../models/order')
	edit_result = await order_model.edit_order(order_info, where)

	console.log(edit_result)
  	if(edit_result){
  		ctx.body = {'code':200, 'message':'编辑成功'}
  	}else{
  		ctx.body = {'code':500, 'message':'编辑失败'}
  	}
}


async function get_order_info(ctx, next) {
	order_id = ctx.request.query.order_id

	order_model = require('../models/order')
	order_info = await order_model.get_order_info(order_id)
	// console.log(goods_info)
  	ctx.body = {'code':200, 'data': order_info}

}


async function get_order_list(ctx, next) {
	user_id = ctx.request.query.user_id
	page = ctx.request.query.page
	page_size = ctx.request.query.page_size

	//测试数据
	// search_data = {
	// 	'goods_name': '防晒霜',
	// 	'status': 1,
	// 	'page': 1
	// }

	page = page > 0 ? parseInt(page) : 1
	page_size = page_size > 0 && page_size < 100 ? parseInt(page_size) : 20

	// goods_name = goods_name
	// status = status

	where = {'user_id': user_id}
	// if (goods_name) {
	// 	// where.goods_name = goods_name
	// }
	// if (status) {
	// 	where.status = status
	// }
	order_model = require('../models/order')
	order_data = await order_model.get_order_list(where, (page - 1)*page_size, 20)
	order_data.page = page
	order_data.page_count = Math.ceil(order_data.count / page_size)

	console.log('order_data')
	console.log(order_data)
	
	var order_list_id = []
	order_list = order_data.rows

	console.log('order_list')
	console.log(order_list)

	for (let i in order_list) {
		order_list_id.push(order_list[i].id)
	}
	console.log('order_list_id')
	console.log(order_list_id)

	order_goods_where = {'order_id': {$in: order_list_id}}
	order_goods_model = require('../models/order_goods')
	goods_list = await order_goods_model.get_order_goods_list(order_goods_where)

	console.log('goods_list')
	console.log(goods_list)

	var goods_list_data = []
	for (let i in goods_list) {
		var order_id = goods_list[i].order_id
	    if (goods_list_data[order_id] == undefined){
	      goods_list_data[order_id] = []
	    }
    	goods_list_data[order_id].push(goods_list[i])
	}
	
	console.log('goods_list_data')
	console.log(goods_list_data)

	for (let i in order_data.rows) {
	    // var order_id = order_data.rows[i].id
	    order_data.rows[i].goods_list = 'goods_list'
	}

  ctx.body = {'code':200, 'data': order_data}

}


module.exports = {
  submit_order,
  update_order,
  get_order_info,
  get_order_list
}

