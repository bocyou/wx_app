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
    this.getCartList()
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
    var user_id = wx.getStorageSync('user_info').user_id
    wx.request({
      url: app.config.service.cartListUrl, //仅为示例，并非真实的接口地址
      data: {
        'user_id': user_id
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


  //点击+ - 或者直接输入数量时，改变data数据，然后触发该修改购物车函数，传入索引
  editCart: function (event) {
    console.log(event)
    var edit_number = event.currentTarget.dataset.number
    var cart_id = event.currentTarget.dataset.id
    var index = event.currentTarget.dataset.index
    var type = event.currentTarget.dataset.type

    var cart_list = this.data.cart_list
    if (type == 'input') {
      cart_list[index].goods_number = event.detail.value
    } else {
      cart_list[index].goods_number = parseInt(cart_list[index].goods_number) + parseInt(edit_number)
    }
    
    this.setData({
      'cart_list': cart_list
    })

    var that = this
    wx.request({
      url: app.config.service.editCartUrl, //仅为示例，并非真实的接口地址
      data: {
        cart_id: cart_list[index].id,
        goods_number: cart_list[index].goods_number
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (e) {
        util.showModel('错误', e)
      }
    })
  },

  delCart: function (event) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除该商品吗？',
      success: function (res) {
        if (res.confirm) {
          var cart_id = event.currentTarget.dataset.id
          var index = event.currentTarget.dataset.index
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
              var cart_lsit = that.data.cart_list
              cart_lsit.splice(index, 1)
              that.setData({
                'cart_list': cart_lsit
              })
              console.log(that.data.cart_list)
            },
            fail: function (e) {
              util.showModel('错误', e)
            }
          })

        } else if (res.cancel) {
          return
        }
      }
    })

  },

  submitOrder: function () {
    wx.request({
      url: app.config.service.submitOrderUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code = '200') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          util.showModel('错误', 'error')
        }

      },
      fail: function (e) {
        util.showModel('错误', e)
      }
    })
  },



})