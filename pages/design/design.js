// pages/design/design.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '../../images/sf0.png',
    upload: '../../images/icon-upload.png',
    sucai: '../../images/icon-sucai.png',
    text: '../../images/icon-text.png',
    directionIndex: 0,
    direction: [{
      index: 0,
      name: '正'
    }, {
      index: 1,
      name: '背'
    }],
    sizeIndex: 0,
    size: [{
      index: 0,
      img: '../../images/icon-type1.png',
      name: '短袖T恤'
    }, {
      index: 1,
      img: '../../images/icon-type2.png',
      name: '长袖T恤'
    }],
    typeIndex: 0,
    types: [{
      index: 0,
      img: '../../images/icon-man.png',
      name: '男款'
    }, {
      index: 1,
      img: '../../images/icon-woman.png',
      name: '女款'
    }, {
      index: 2,
      img: '../../images/icon-children.png',
      name: '儿童'
    }],
    typeSize: 's',
    typeDirection: 'f',
    curColor: '#ffffff',
    colors: [{
      index: 0,
      name: '白色',
      key: '#ffffff'
    }, {
      index: 1,
      name: '黑色',
      key: '#000000'
    }, {
      index: 2,
      name: '红色',
      key: '#ff0000'
    }, {
      index: 3,
      name: '紫色',
      key: '#800080'
    }, {
      index: 4,
      name: '宝蓝',
      key: '#4169E1'
    }],
    imageList:[]
  },
  chooseImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album','camera'],
      success: function(res) {
        that.setData({
          imageList: res.tempFilePaths
        })
      },
    })
  },
  previewImage: function (e){
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imageList,
    })
  },
  changeDirection: function(e) {
    var direction = e.currentTarget.dataset.type
    var id = e.currentTarget.dataset.id
    this.setData({
      typeDirection: direction,
      directionIndex: id,
      img: '../../images/' + this.data.typeSize + direction + this.data.typeIndex + '.png'
    })
  },
  changeType: function(e) {
    var id = e.currentTarget.dataset.type
    this.setData({
      typeIndex: id,
      img: '../../images/' + this.data.typeSize + this.data.typeDirection + id + '.png'
    })
  },
  changeColor: function(e) {
    var type = e.currentTarget.dataset.type
    this.setData({
      curColor: type
    })
  },
  changeSize: function(e) {
    var size = e.currentTarget.dataset.type
    var id = e.currentTarget.dataset.id
    this.setData({
      typeSize: size,
      sizeIndex: id,
      img: '../../images/' + size + this.data.typeDirection + this.data.typeIndex + '.png'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})