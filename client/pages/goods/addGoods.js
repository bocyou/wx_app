// pages/addGoods/addGoods.js
var util = require('../../utils/util.js')
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsData: {
      goodsName: '',
      goodsSn: '',
      goodsDescription: '',
      goodsPrice: 0,
      goodsImgUrl: '',
      shopId: 1
    },
    // tagList: [],  //标签ID和名称
    photoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //设置封面图片
  setGoodsCover: function (e) {
    console.log(e)
    var photo_list = this.data.photoList
    for (var i=0; i < photo_list.length; i++) {
      photo_list[i]['is_cover'] = 0
    }
    photo_list[e.detail.id]['is_cover'] = 1
    this.setData({
      'goodsData.goodsImgUrl': e.detail.id.img_url
    })
    this.setData({
      'goodsData.photoList': photo_list
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
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          var filePath = res.tempFilePaths[i]
          // 上传图片
          wx.uploadFile({
            url: app.config.service.uploadUrl,
            filePath: filePath,
            name: 'file',

            success: function (res) {
              util.showSuccess('上传图片成功')
              console.log(res)
              res = JSON.parse(res.data)
              console.log(res)

              var photoList = that.data.photoList
              photoList.push({ 'img_url': res.data.imgUrl, 'is_cover': 0 })
              that.setData({
                'photoList': photoList,
                'goodsData.goodsImgUrl': res.data.imgUrl
              })
              console.log(that.data)
            },

            fail: function (e) {
              console.log(app.config.service.uploadUrl)
              console.error(e)
              util.showModel('错误', e)
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
      url: app.config.service.addGoodsUrl, //仅为示例，并非真实的接口地址
      data: {
        goods_name: this.data.goodsData.goodsName,
        goods_description: this.data.goodsData.goodsDescription,
        goods_img_url: this.data.goodsData.goodsImgUrl,
        goods_sn: this.data.goodsData.goodsSn,
        // goods_tag: this.data.goodsData.goodsTag,
        goods_price: this.data.goodsData.goodsPrice,
        shop_id: this.data.goodsData.shopId,
        photo_list: this.data.photoList
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code == '200') {
          util.showSuccess('成功', res.data.message)
        } else {
          util.showModel('失败', res.data.message)
        }  
      }
    })
  }


})