/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
async function add_goods(ctx, next) {
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
	add_result = await goods_model.add_goods(goods_info)  

  goods_id = add_result.id
	console.log('goods_id = ' + add_result.id)
  if (goods_id) {
    photo_model = require('../models/photo')
    photo_list = goods_query.photo_list
    for (i=0; i < photo_list.length; i++) {
      photo_info = {
        'goods_id': goods_id,
        'goods_path': photo_list[i].img_url,
        'is_cover': photo_list[i].is_cover,
        'sort': i
      }
      add_photo_result = await photo_model.add_photo(photo_info)
    }							

    ctx.body = { 'code': 200, 'message': '添加成功'}
  }else{
    ctx.body = {'code':500, 'message':'添加失败'}
  }
}


async function edit_goods(ctx, next) {
	goods_query = ctx.request.body
	goods_id = goods_query.goods_id
	//先添加商品
	goods_info = {
		'goods_name': goods_query.goods_name,
		'goods_sn': goods_query.goods_sn,
		'goods_description': goods_query.goods_description,
		'goods_tag': goods_query.goods_tag,
		'goods_price': goods_query.goods_price,
		'goods_img_url': goods_query.goods_img_url,
	}

	where = {'id': goods_id}
	//更新相册表goods_id字段

	goods_model = require('../models/goods')
	edit_result = await goods_model.edit_goods(goods_info, where)

	console.log(edit_result)
  	if(edit_result){
  		photo_model = require('../models/photo')
  		photo_list = goods_query.photo_list
  		for (var i = 0; i < photo_list.length; i++) {
  			if (photo_list[i]['id']) {
  				//编辑
  				where = {'id': photo_list[i]['id']}
  				values = {
  					'goods_id': goods_id,
  					'goods_path': photo_list[i]['goods_path'],
  					'is_cover': photo_list[i]['is_cover'],
  					'sort': i
  				}
  				photo_model.edit_photo(values, where)
  			} else {
  				//新增
  				values = {
  					'goods_id': goods_id,
  					'goods_path': photo_list[i]['goods_path'],
  					'is_cover': photo_list[i]['is_cover'],
  					'sort': i
  				}
  				photo_model.add_photo(values)	
  			}
  		}

  		ctx.body = {'code':200, 'message':'编辑成功'}
  	}else{
  		ctx.body = {'code':500, 'message':'编辑失败'}
  	}
}


async function del_goods(ctx, next) {
	goods_id = ctx.request.query.goods_id
	where = {'id': goods_id}

	goods_model = require('../models/goods')
	del_goods_result = await goods_model.del_goods(where)
	console.log(del_goods_result)
	if (del_goods_result) {
		// 删除图片
		photo_model = require('../models/photo')
		where = {'goods_id': goods_id}
		del_photo_result = await photo_model.del_photo(where)
		if (del_photo_result) {
			ctx.body = {'code':200, 'message': '删除成功'}		
		} else {
			ctx.body = {'code':500, 'message': '相册删除失败'}		
		}
			
	} else {
		ctx.body = {'code':500, 'message': '删除失败'}	
	}

}


async function get_goods_info(ctx, next) {
	goods_id = ctx.request.query.goods_id

	goods_model = require('../models/goods')
	goods_info = await goods_model.get_goods_info(goods_id)

	photo_where = {'goods_id': goods_id}
	photo_model = require('../models/photo')
	photo_list = await photo_model.get_photo_list(photo_where, 0, 9)

	data = {'goods_info': goods_info, 'photo_list': photo_list}
	// console.log(goods_info)
  	ctx.body = {'code':200, 'data': data}

}

async function get_goods_list(ctx, next) {
	search_data = ctx.request.query

	goods_name = search_data.goods_name
	page = search_data.page > 0 ? parseInt(search_data.page) : 1
	page_size = search_data.page_size > 0 && search_data.page_size < 100 ? parseInt(search_data.page_size) : 20
	// goods_sn = search_data.goods_sn

	where = {}
	if (goods_name) {
		where.goods_name = goods_name
	}

	goods_model = require('../models/goods')
	goods_data = await goods_model.get_goods_list(where, (page - 1)*page_size, page_size)
	goods_data.page = page
	goods_data.page_count = Math.ceil(goods_data.count / page_size)


  ctx.body = {'code':200, 'data': goods_data}

}


module.exports = {
  add_goods,
  edit_goods,
  del_goods,
  get_goods_info,
  get_goods_list
}
