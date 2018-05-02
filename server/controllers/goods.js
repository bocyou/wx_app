/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
async function add_goods(ctx, next) {
	goods_query = ctx.request.query

	//先添加商品
	goods_info = {
		'goods_name': goods_query.goods_name,
		'goods_sn': goods_query.goods_sn,
		'goods_description': goods_query.goods_description,
		'goods_tag': goods_query.goods_tag,
		'goods_price': goods_query.goods_price,
		'goods_img_url': goods_query.goods_img_url,
		'shop_id': goods_query.shop_id,
		'status': 1,
		'add_time': Math.round(Date.now() / 1000)
	}
	//更新相册表goods_id字段
	


	var goods_model = require('../models/goods')
	var data = await goods_model.add_goods(goods_info)
  	if(data){
  		ctx.body = 'success'
  	}else{
  		ctx.body = 'error'	
  	}
  // const { signature, timestamp, nonce, echostr } = ctx.query
  	// ctx.body = JSON.stringify(data)
  	
   // + data.toString()
}


async function get_goods_list(ctx, next) {

	var goods_model = require('../models/goods')

	var where = {'goods_sn': 'G001'}
	var data = await goods_model.get_goods_list(where)

  // const { signature, timestamp, nonce, echostr } = ctx.query
  	ctx.body = JSON.stringify(data)
   // + data.toString()
}


module.exports = {
  add_goods,
  get_goods_list
}
