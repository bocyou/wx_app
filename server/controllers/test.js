/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
async function get(ctx, next) {
	var user_model = require('../models/user');
	var data = user_model.get_user_list();
	console.log(data);
  const { signature, timestamp, nonce, echostr } = ctx.query
  ctx.body = 'hello world! ' + data.toString()
}


module.exports = {
  get
}
