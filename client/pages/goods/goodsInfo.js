// pages/goods/goodsInfo.js

var util = require('../../utils/util.js')

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'goods_id': 0,
    'goods_info': {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goods_id: options.goods_id
    })
    this.getGoodsInfo()
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

  getGoodsInfo: function () {
    var goods_id = this.data.goods_id
    var that = this
    wx.request({
      url: app.config.service.goodsInfoUrl, //仅为示例，并非真实的接口地址
      data: {
        'goods_id': goods_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          'goods_info': res.data.data
        })
        console.log(that.data.goods_info)
      },
      fail: function (e) {
        util.showModel('错误', e)
      }
    })
  },

  addToCart: function () {
    wx.request({
      url: app.config.service.goodsInfoUrl, //仅为示例，并非真实的接口地址
      data: {
        'goods_id': this.data.goods_id,
        'goods_number': 1
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        util.showSuccess('成功')      
      },
      fail: function (e) {
        util.showModel('错误', e)
      }
    })
  }

})