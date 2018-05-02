/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
async function add_goods(ctx, next) {
	console.log(ctx)
	goods_query = ctx.request.body

	//先添加商品
	goods_info = {
		'goods_name': goods_query.goods_name,
		'goods_sn': goods_query.goods_sn,
		'goods_description': goods_query.goods_description,
		'goods_tag': goods_query.goods_tag,
		'goods_price': goods_query.goods_price,
		'goods_img_url': goods_query.goods_img_url,
		'shop_id': goods_query.shop_id,
		'status': 0,
		'add_time': Math.round(Date.now() / 1000)
	}
	//更新相册表goods_id字段

	goods_model = require('../models/goods')
	data = await goods_model.add_goods(goods_info)
  	if(data){
  		ctx.body = {'code':200, 'message':'添加成功'}
  	}else{
  		ctx.body = {'code':500, 'message':'添加失败'}
  	}
}


async function get_goods_list(ctx, next) {

	goods_model = require('../models/goods')

	search_data = ctx.request.query
	goods_name = search_data.query
	goods_sn = search_data.query

	where = {}
	if (goods_name) {
		where.goods_name = goods_name
	}
	if (goods_sn) {
		where.goods_sn = goods_sn
	}
	data = await goods_model.get_goods_list(where)

  	ctx.body = {'code':200, 'data': data}

}


module.exports = {
  add_goods,
  get_goods_list
}
