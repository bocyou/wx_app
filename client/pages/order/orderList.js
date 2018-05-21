// pages/order/orderList.js
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
    'order_list': [],
    'options': {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList()
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
    this.getOrderList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getOrderList: function () {
    var that = this
    wx.request({
      url: app.config.service.getOrderListUrl, //仅为示例，并非真实的接口地址
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          'page': res.data.data.page,
          'order_list': res.data.data.rows,
          'count': res.data.data.count,
          'page_count': res.data.data.page_count
        })
      },
      fail: function (e) {
        util.showModel('错误', e)
      }
    })

  }


})