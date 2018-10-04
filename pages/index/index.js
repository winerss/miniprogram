// pages/order.js
const app = getApp()
var x1 = 0,
  y1 = 0;
// var config = require('../../config')
var flag = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: [],
    images: [],
    imgIndex: 0, //正反左右显示下标
    flag: "all", //控制底部显示模块
    sucaiList: [], //素材标题列表
    sucaiListId: 0, //素材id
    sucai: [], //素材小图标列表
    page: 1,
    scrollLeft: 0, //素材小图标的横向滚动条位置
    iconIndex: -1, //大图中选中的图标下标
    s: 0, //缩放时触摸点离图表中的距离,
    scale: 1, //缩放比例,
    rotate: 0,
    x: 0,
    y: 0,
    deg1: 0,
    p: 0,
    fonts: [],
    color: "#000000",
    fontId: 0,
    fontStyle: {
      bold: false,
      italic: false
    },
    query: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      p: wx.getSystemInfoSync().windowWidth / 750
    })
    if (options.template_id) {
      wx.ajax({
        url: config.service.getOrderDetail + "?id=" + options.template_id,
        success: (res) => {
          console.log(res)
          // e.left = parseInt(e.left * 2 * p);
          var arr = JSON.parse(res.data[0].props).map((e, i) => {
            var p = e.width / 500;
            e.props = e.props.map((e, i) => {
              // console.log(e,i)
              e.left = e.left * this.data.p / p;
              e.top = e.top * this.data.p / p;
              e.position = {
                left: 0,
                top: 0
              }
              return e
            })
            return e
          })
          this.data.query = {
            id: res.data[0].drawBoardid,
            color: JSON.parse(res.data[0].propid).color_id,
            size: JSON.parse(res.data[0].propid).size_id,
            catId: res.data[0].catId,
            template_id: options.template_id
          }
          this.setData({
            imgUrl: arr,
            images: arr[0].props,
          })
        }
      })
    } else {
      this.data.query = options;
      wx.ajax({
        url: config.service.getDetailUrl + "?id=" + options.id,
        success: (res) => {
          console.log(res)
          this.setData({
            imgUrl: res.data.map((e, i) => {
              e.props = []
              return e
            })
          })
        }
      })
    }
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
  changeImg(e) {
    this.setData({
      imgIndex: e.currentTarget.dataset.index,
      images: this.data.imgUrl[e.currentTarget.dataset.index].props
    })
  },
  //获取素材、徽章、联名的列表数据
  getsucaiList(e) {
    this.setData({
      flag: e.currentTarget.dataset.info,
      sucai: [],
      sucaiList: []
    })
    var categoryType = ""
    switch (e.currentTarget.dataset.info) {
      case "sucai":
        categoryType = "PRINTING";
        break;
      case "huizhang":
        categoryType = "BADGE";
        break;
      case "lianming":
        categoryType = "JOINTLY";
        break;
      case "fonts":
        wx.ajax({
          url: config.service.getFontsUrl,
          success: (res) => {
            console.log(res)
            this.setData({
              fonts: res.data,
              color: res.data.color[0],
              fontId: res.data.font[0].id
            })
          }
        })
        return;
      case "shangchuan":
        return;
    }
    wx.showLoading({
      title: "请求资源中...",
      mask: true,
    })
    wx.ajax({
      url: config.service.getSucaiListUrl + "?categoryType=" + categoryType + "&pageNumber=1&pageSize=100",
      success: (res) => {
        console.log(res)
        this.setData({
          sucaiList: res.data,
          sucaiListId: res.data[0].jointlyId
        })
        wx.ajax({
          url: config.service.getSucaiUrl + "?jointlyId=" + res.data[0].jointlyId + "&pageNumber=1&pageSize=6",
          success: (res) => {
            console.log(res)
            this.setData({
              sucai: res.data,
            })
            wx.hideLoading()
          },
          complete() {
            wx.hideLoading()
          }
        })
      }
    })
  },
  closetop() {
    this.setData({
      flag: "all",
    })
  },
  //获取素材、徽章、联名的列表下图标数据
  getsucai(e) {
    this.setData({
      sucaiListId: e.currentTarget.dataset.id,
      page: 1,
      scrollLeft: 0
    })
    wx.showLoading({
      title: "请求资源中..."
    })
    wx.ajax({
      url: config.service.getSucaiUrl + "?jointlyId=" + this.data.sucaiListId + "&pageNumber=1&pageSize=6",
      success: (res) => {
        this.setData({
          sucai: res.data,
        });
        wx.hideLoading()
      }
    })
  },
  //小图标向右滑动到底的加载事件
  load(e) {
    this.setData({
      page: this.data.page + 1
    })
    wx.showLoading({
      title: "请求资源中..."
    })
    wx.ajax({
      url: config.service.getSucaiUrl + "?jointlyId=" + this.data.sucaiListId + "&pageNumber=" + this.data.page + "&pageSize=6",
      success: (res) => {
        this.setData({
          sucai: this.data.sucai.concat(res.data),
        })
        wx.hideLoading()
      }
    })
  },
  //点击图标添加到大图
  addImg(e) {
    console.log(e.currentTarget.dataset.type)
    if (this.data.imgUrl[this.data.imgIndex].props.length >= 20) {
      wx.showToast({
        title: "不能超过20件...",
        icon: "none",
        success: () => {
          setTimeout(() => {
            wx.hideToast()
          }, 1500)
        }
      })
    } else {
      console.log(e.currentTarget.dataset.dragize)
      this.data.imgUrl[this.data.imgIndex].props.push({
        url: e.currentTarget.dataset.url,
        id: e.currentTarget.dataset.id,
        dragize: e.currentTarget.dataset.dragize,
        width: e.currentTarget.dataset.width,
        height: e.currentTarget.dataset.height,
        price: e.currentTarget.dataset.price,
        top: 0,
        left: 0,
        scale: 1,
        rotate: 0,
        position: {
          left: 0,
          top: 0
        }
      })
      this.setData({
        images: this.data.imgUrl[this.data.imgIndex].props
      })
    }

  },
  // 大图中图标的删除事件
  moveclose(e) {
    this.data.imgUrl[this.data.imgIndex].props.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      images: this.data.imgUrl[this.data.imgIndex].props
    })
  },
  test() {
    this.setData({
      iconIndex: -1
    })
  },
  ////图标移动开始事件
  start(e) {
    this.setData({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      iconIndex: e.currentTarget.dataset.index
    })
  },
  //图标移动中事件
  move(e) {
    // console.log(e);
    if (flag) {
      flag = false;
      setTimeout(() => {
        flag = true;
      }, 50)
      let arr = Object.assign({}, this.data.images, {})
      arr[e.currentTarget.dataset.index].position = {
        left: e.touches[0].clientX - this.data.x,
        top: e.touches[0].clientY - this.data.y
      }
      this.setData({
        images: arr
      })
    }
  },
  //图标移动结束
  end(e) {
    let arr = Object.assign({}, this.data.images, {})
    this.data.imgUrl[this.data.imgIndex].props[e.currentTarget.dataset.index].left = arr[e.currentTarget.dataset.index].left = arr[e.currentTarget.dataset.index].left + arr[e.currentTarget.dataset.index].position.left;
    this.data.imgUrl[this.data.imgIndex].props[e.currentTarget.dataset.index].top = arr[e.currentTarget.dataset.index].top = arr[e.currentTarget.dataset.index].top + arr[e.currentTarget.dataset.index].position.top;
    arr[e.currentTarget.dataset.index].position = {
      left: 0,
      top: 0
    };
    this.setData({
      images: arr
    })
  },
  //图标缩放，旋转开始
  scaleStart(e) {
    let p = 500 / this.data.imgUrl[this.data.imgIndex].width;
    x1 = ((125 + this.data.imgUrl[this.data.imgIndex].left * p + this.data.imgUrl[this.data.imgIndex].areaWidth / 2 * p) * this.data.p) + this.data.images[e.currentTarget.dataset.index].left;
    y1 = ((102 + this.data.imgUrl[this.data.imgIndex].top * p + this.data.imgUrl[this.data.imgIndex].areaHeight / 2 * p) * this.data.p) + this.data.images[e.currentTarget.dataset.index].top;

    let x = e.touches[0].clientX - x1,
      y = e.touches[0].clientY - y1,
      s = 0;
    let cos = Math.abs(x) / Math.pow((Math.pow(x, 2) + Math.pow(y, 2)), 0.5);
    var radina = Math.acos(cos);
    var angle = Math.floor(180 / (Math.PI / radina));
    if (x > 0) {
      if (y > 0) {
        angle = 360 - angle
      }
    } else {
      if (y > 0) {
        angle += 180
      } else {
        angle = 180 - angle
      }
    }
    this.setData({
      actionIndex: e.currentTarget.dataset.index,
      s: Math.pow((Math.pow(x, 2) + Math.pow(y, 2)), 0.5),
      deg1: angle
    })
  },
  //缩放，旋转
  scaleMove(e) {
    if (flag) {
      flag = false;
      setTimeout(() => {
        flag = true
      }, 50)
      let x = e.touches[0].clientX - x1,
        y = e.touches[0].clientY - y1,
        s = 0;
      s = Math.pow((Math.pow(x, 2) + Math.pow(y, 2)), 0.5);
      let cos = Math.abs(x) / s;
      var radina = Math.acos(cos);
      var angle = Math.floor(180 / (Math.PI / radina));
      if (x > 0) {
        if (y > 0) {
          angle = 360 - angle
        }
      } else {
        if (y > 0) {
          angle += 180
        } else {
          angle = 180 - angle
        }
      }
      var obj = {

      }
      if (e.currentTarget.dataset.dragize !== 0) {
        obj.scale = s / this.data.s.toFixed(2)
      }
      obj.rotate = parseInt(this.data.deg1 - angle)
      this.setData(obj)
    }
  },
  //图标缩放，旋转结束
  scaleEnd(e) {
    let arr = Object.assign({}, this.data.images, {});
    this.data.imgUrl[this.data.imgIndex].props[e.currentTarget.dataset.index].scale = arr[e.currentTarget.dataset.index].scale = arr[e.currentTarget.dataset.index].scale * this.data.scale;
    this.data.imgUrl[this.data.imgIndex].props[e.currentTarget.dataset.index].rotate = arr[e.currentTarget.dataset.index].rotate = arr[e.currentTarget.dataset.index].rotate + this.data.rotate;
    this.setData({
      images: arr,
      actionIndex: -1,
      rotate: 0,
      scale: 1,
    });
  },
  //文字切换颜色
  colorChange(e) {
    this.setData({
      color: e.currentTarget.dataset.color
    })
  },
  //切换字体
  fontChange(e) {
    this.setData({
      fontId: e.currentTarget.dataset.id
    })
  },
  //切换字体样式
  fontStyleChange(e) {
    this.data.fontStyle[e.currentTarget.dataset.prop] = !this.data.fontStyle[e.currentTarget.dataset.prop]
    this.setData({
      fontStyle: this.data.fontStyle
    })
  },
  //上传图片
  upLoadImg() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        wx.uploadFile({
          url: config.service.uploadUrl,
          name: "img",
          filePath: res.tempFilePaths[0],
          success: (res) => {
            console.log(res)
          }
        })
      }
    })
  },
  //确定定制
  sure(e) {
    let obj = JSON.parse(JSON.stringify(this.data.imgUrl))
    obj.length = this.data.imgUrl.length;
    let res = Array.prototype.map.call(obj, (e, i) => {
      var p = e.width / 500;
      e.props = e.props.map((e) => {
        delete e.position;
        e.left = parseInt(e.left / this.data.p * p);
        e.top = parseInt(e.top / this.data.p * p);
        if (e.type === "BADGE") {
          e.width = parseInt(50 * p);
          e.height = parseInt(50 * p)
        } else {
          e.width = parseInt(150 * e.scale * p);
          e.height = parseInt(150 * e.scale * p)
        }
        return e
      })
      return e
    })
    var req = {
      drawBoardid: Number(this.data.query.id),
      propid: JSON.stringify({
        color_id: Number(this.data.query.color),
        size_id: Number(this.data.query.size)
      }),
      catId: Number(this.data.query.catId),
      props: JSON.stringify(res)
    }
    console.log(req)
    wx.ajax({
      url: config.service.createOrderUrl,
      data: req,
      method: "POST",
      success: (res) => {
        console.log(res)
        if (res.data.order_id) {
          wx.navigateTo({
            url: '/pages/detail/detail?id=' + res.data.order_id,
          })
        }
      },
      fail: () => {
        console.log("失败")
      }
    })
  }
})