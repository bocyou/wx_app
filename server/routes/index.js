/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

// --- 测试接口 Demo --- //
// GET
router.get('/test', controllers.test.get)




// 商品模块 //
router.post('/goods/add_goods', controllers.goods.add_goods)
router.post('/goods/edit_goods', controllers.goods.edit_goods)
router.post('/goods/del_goods', controllers.goods.del_goods)
router.get('/goods/get_goods_info', controllers.goods.get_goods_info)
router.get('/goods/get_goods_list', controllers.goods.get_goods_list)

// 图片模块 //
router.get('/photo/add_photo', controllers.photo.add_photo)
router.get('/photo/del_photo', controllers.photo.del_photo)
router.get('/photo/get_photo_list', controllers.photo.get_photo_list)


// 购物车模块 //
router.get('/cart/add_cart', controllers.cart.add_cart)
router.get('/cart/edit_cart', controllers.cart.edit_cart)
router.get('/cart/del_cart', controllers.cart.del_cart)
router.get('/cart/get_cart_list', controllers.cart.get_cart_list)

// 订单模块 //
router.get('/order/submit_order', controllers.order.submit_order)
router.get('/order/update_order', controllers.order.update_order)
router.get('/order/get_order_info', controllers.order.get_order_info)
router.get('/order/get_order_list', controllers.order.get_order_list)

  
module.exports = router
