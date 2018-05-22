/**
 * 
 */
async function login(ctx, next) {
  params = ctx.request.body

  user_model = require('../models/user')
  user_info = await user_model.get_user_info({'open_id': params.open_id})
  if(!user_info) {
    user_data = {
      'open_id': params.open_id,
      'username': params.open_id,
      'password': params.open_id,
      'secret_key': params.open_id,
      'session_key': params.session_key,
      'shop_id': 0,
      'sex': 0,
      'status': 1,
      'add_time': Math.round(Date.now() / 1000)  
    }

    user_info = await user_model.add_user(user_data)
  }

  // console.log(goods_info)
  ctx.body = { 'code': 200, 'data': user_info }

}

module.exports = {
  login
}