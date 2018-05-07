// pages/cart/cartList.js

var util = require('../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'cart_list': []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.get_cart_list()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },



  getCartList: function () {
    var user_id = this.data.user_id
    var that = this
    wx.request({
      url: app.config.service.cartListUrl, //仅为示例，并非真实的接口地址
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          'cart_list': res.data.data
        })
        console.log(that.data.cart_list)
      },
      fail: function (e) {
        util.showModel('错误', e)
      }
    })

  },


  //点击+ - 或者直接输入数量时，改变data数据，然后触发该修改购物车函数，传入索引
  editCart: function (i) {
    var cart_info = this.data.cart_list[i]
    var that = this
    wx.request({
      url: app.config.service.editCartUrl, //仅为示例，并非真实的接口地址
      data: {
        cart_id: cart_info.id,
        goods_number: cart_info.goods_number
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          'cart_list': res.data.data
        })
        console.log(that.data.cart_list)
      },
      fail: function (e) {
        util.showModel('错误', e)
      }
    })
  },

  delCart: function (cart_id) {
    var that = this
    wx.request({
      url: app.config.service.delCartUrl, //仅为示例，并非真实的接口地址
      data: {
        cart_id: cart_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          'cart_list': res.data.data
        })
        console.log(that.data.cart_list)
      },
      fail: function (e) {
        util.showModel('错误', e)
      }
    })
  }
})