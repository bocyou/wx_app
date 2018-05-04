/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
async function submit_order(ctx, next) {
	order_query = ctx.request.body

	//测试数据
	order_query = {
		'user_id': 1,
		'shop_id': 1,
		'consignee': '向动',
		'address': '深圳市福田区',
		'remark': '备注'
	}

	cart_model = require('../models/cart')
	cart_list = await cart_model.get_cart_list_join_goods()

	goods_amount = 100
	order_amount = 100

	//1.添加订单记录
	//2.添加订单商品记录

	//先添加商品
	order_info = {
		'user_id': order_query.user_id,
		'shop_id': order_query.shop_id,
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
	order_id = add_result.dataValues.id
	console.log('order_id = ' + add_result.dataValues.id)
  	if (order_id) {
		//添加商品记录	
		order_goods_model = require('../models/order_goods')					
		for (goods in cart_list) {
			goods_data = {
				'order_id': order_id,
				'goods_id': goods.goods_id,
				'goods_name': goods.goods_name,
				'goods_price': goods.goods_price,
				'goods_number': goods.goods_number			
			}
			order_goods_model.add_order_goods(goods_data)
		}

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
	search_data = ctx.request.query

	//测试数据
	search_data = {
		'goods_name': '防晒霜',
		'status': 1,
		'page': 1
	}

	goods_name = search_data.goods_name
	status = search_data.status

	where = {'user_id': 1}
	if (goods_name) {
		// where.goods_name = goods_name
	}
	if (status) {
		where.status = status
	}
	order_model = require('../models/order')
	order_list = await order_model.get_order_list(where, 0, 20)

  	ctx.body = {'code':200, 'data': order_list}

}


module.exports = {
  submit_order,
  update_order,
  get_order_info,
  get_order_list
}

