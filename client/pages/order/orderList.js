// pages/order/orderList.js
var util = require('../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'page': 1,
    'page_count': 0,
    'count': 0,
    'page_size': app.config.page.page_size,
    'order_list': []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getOrderList(0)
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
    this.setData({
      'page': 1
    })
    this.getOrderList(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.page < this.data.page_count) {
      this.setData({
        'page': this.data.page + 1
      })
      this.getOrderList(1)
    } else {
      util.showSuccess('提示', '没有数据')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getOrderList: function (type) {
    var user_id = wx.getStorageSync('user_info').user_id
    var that = this
    wx.request({
      url: app.config.service.getOrderListUrl, //仅为示例，并非真实的接口地址
      data: {
        'user_id': user_id,
        'page': that.data.page,
        'page_size': that.data.page_size
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          'page_count': res.data.data.page_count,
          'count': res.data.data.count
        })
        if (type == 0) {
          that.setData({
            'order_list': res.data.data.rows
          })
        } else if (type == 1) {
          that.setData({
            'order_list': that.data.order_list.concat(res.data.data.rows)
          })
        }

        console.log(that.data.order_list)
      },
      fail: function (e) {
        util.showModel('错误', e)
      }
    })

  }

})