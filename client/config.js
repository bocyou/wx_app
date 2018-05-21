/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://qmuao5e8.qcloud.la';

var api_host = 'https://qmuao5e8.qcloud.la/weapp';

var config = {
    appid: 'wxaf8b50ba2a498b08',
    secret: '3b00c9f489e4c5c58c53d3a30773fc70',

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${api_host}/user/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        addGoodsUrl: `${api_host}/goods/add_goods`,
        editGoodsUrl: `${api_host}/goods/edit_goods`,
        goodsListUrl: `${api_host}/goods/get_goods_list`,
        goodsInfoUrl: `${api_host}/goods/get_goods_info`,
        setCoverUrl: `${api_host}/photo/set_cover`,
        delPhotoUrl: `${api_host}/photo/del_photo`,

        addToCartUrl: `${api_host}/cart/add_cart`,
        editCartUrl: `${api_host}/cart/edit_cart`,
        cartListUrl: `${api_host}/cart/get_cart_list`,
        delCartUrl: `${api_host}/cart/del_cart`,

        submitOrderUrl: `${api_host}/order/submit_order`, 
        getOrderListUrl: `${api_host}/order/get_order_list`, 
        
    },
    page: {
      'page_size': 5
    }
};

module.exports = config;
