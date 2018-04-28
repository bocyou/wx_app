/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
async function get(ctx, next) {
	var user_model = require('../models/user');
	var data = await user_model.get_user_list();

  // const { signature, timestamp, nonce, echostr } = ctx.query
  	ctx.body = JSON.stringify(data)
   // + data.toString()
}


module.exports = {
  get
}
