// pages/design/design.js
var olddistance = 0; //这个是上一次两个手指的距离
var newdistance; //本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）
var oldscale = 1; //这个是上一次动作留下的比例
var diffdistance; //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象
var baseHeight; //上一次触摸完之后的高
var baseWidth; //上一次触摸完之后的宽
var windowWidth = 0; //咱们屏幕的宽
var windowHeight = 0; //咱们屏幕的高
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
    imageList: [],
    x: 0,
    y: 0,
    scale: 1,
    add: '../../images/icon-add.png',
    min: '../../images/icon-min.png',
    rotate: '../../images/icon-rotate.png',
    ok: '../../images/icon-ok.png',
    remove: '../../images/icon-remove.png',
    rotateVale: 0
  },
  tapadd() {
    if (this.data.scale < 1.4) {
      this.setData({
        scale: this.data.scale + 0.1
      })
    }
  },
  tapmin() {
    if (this.data.scale > 0.6) {
      this.setData({
        scale: this.data.scale - 0.1
      })
      console.log(1)
    }
  },
  taprotate() {
    this.setData({
      rotateVale: this.data.rotateVale - 10
    })
  },
  onChange(e) {
    // console.log(e.detail)
  },
  onScale(e) {
    // console.log(e.detail)
  },
  chooseImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          imageList: res.tempFilePaths
        })
      },
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imageList,
    })
  },
  changeDirection: function (e) {
    var direction = e.currentTarget.dataset.type
    var id = e.currentTarget.dataset.id
    this.setData({
      typeDirection: direction,
      directionIndex: id,
      img: '../../images/' + this.data.typeSize + direction + this.data.typeIndex + '.png'
    })
  },
  changeType: function (e) {
    var id = e.currentTarget.dataset.type
    this.setData({
      typeIndex: id,
      img: '../../images/' + this.data.typeSize + this.data.typeDirection + id + '.png'
    })
  },
  changeColor: function (e) {
    var type = e.currentTarget.dataset.type
    this.setData({
      curColor: type
    })
  },
  changeSize: function (e) {
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

  }
})