// pages/addGoods/addGoods.js
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsData: {
      goodsName: 'goodsName',
      goodsSn: 'goodsSn',
      goodsDescription: 'goodsDescription',
      goodsPrice: 100,
      goodsTag: 1,
      goodsImgUrl: 'goodsImgUrl',
      shopId: 1
    },
    tagList: [],  //标签ID和名称
    photoData: {
      list: [], //图片ID列表
      cover: 0  //封面图片ID
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取标签列表
    //获取店主的shop_id，赋值给data
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

  setGoodsName: function (e) {
    this.setData({
      'goodsData.goodsName': e.detail.value
    })
  },

  setGoodsDescription: function (e) {
    this.setData({
      'goodsData.goodsDescription': e.detail.value
    })
  },
  setGoodsSn: function (e) {
    this.setData({
      'goodsData.goodsSn': e.detail.value
    })
  },
  setGoodsPrice: function (e) {
    this.setData({
      'goodsData.goodsPrice': e.detail.value
    })
  },
  setGoodsTag: function (e) {
    this.setData({
      'goodsData.goodsTag': e.detail.value
    })
  },    

  // 上传图片接口
  doUpload: function () {
    var that = this

    // 选择图片
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')

        for (i = 0; i < res.tempFilePaths.length; i++) {
          var filePath = res.tempFilePaths[i]

          // 上传图片
          wx.uploadFile({
            url: config.service.uploadUrl,
            filePath: filePath,
            name: 'file',

            success: function (res) {
              util.showSuccess('上传图片成功')
              console.log(res)
              res = JSON.parse(res.data)
              console.log(res)
              that.setData({
                'goodsData.goodsImgUrl[]': res.data.imgUrl
              })
            },

            fail: function (e) {
              util.showModel('上传图片失败')
            }
          })
        }

      },
      fail: function (e) {
        console.error(e)
      }
    })
  },

  // 预览图片
  previewImg: function () {
    wx.previewImage({
      current: this.data.goodsData.goodsImgUrl,
      urls: [this.data.goodsData.goodsImgUrl]
    })
  },

  addGoods: function () {
    wx.request({
      url: config.service.addGoodsUrl, //仅为示例，并非真实的接口地址
      data: {
        goods_name: this.data.goodsData.goodsName,
        goods_description: this.data.goodsData.goodsDescription,
        goods_img_url: this.data.goodsData.goodsImgUrl,
        goods_sn: this.data.goodsData.goodsSn,
        goods_tag: this.data.goodsData.goodsTag,
        goods_price: this.data.goodsData.goodsPrice,
        shop_id: this.data.goodsData.shopId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code == '200') {
          util.showSuccess('添加成功')
        } else {
          util.showSuccess('添加失败')
        }  
      }
    })
  }


})