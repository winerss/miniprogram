Page({
  data: {
    touch: {
      distance: 0,
      scale: 1,
      baseWidth: null,
      baseHeight: null,
      scaleWidth: null,
      scaleHeight: null
    }
  },
  touchstartCallback: function (e) {
    // 单手指缩放开始，也不做任何处理 
    if (e.touches.length == 1) return console.log('双手指触发开始')
    // 注意touchstartCallback 真正代码的开始 
    // 一开始我并没有这个回调函数，会出现缩小的时候有瞬间被放大过程的bug
    // 当两根手指放上去的时候，就将distance 初始化。 
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    this.setData({
      'touch.distance': distance,
    })
  },
  touchmoveCallback: function (e) {
    let touch = this.data.touch
    // 单手指缩放我们不做任何操作 
    if (e.touches.length == 1) return console.log('双手指运动')
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    // 新的 ditance 
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    let distanceDiff = distance - touch.distance;
    let newScale = touch.scale + 0.005 * distanceDiff
    // 为了防止缩放得太大，所以scale需要限制，同理最小值也是 
    if (newScale >= 1.5) {
      newScale = 1.5
    }
    if (newScale <= 0.1) {
      newScale = 0.1
    }
    let scaleWidth = newScale * touch.baseWidth
    let scaleHeight = newScale * touch.baseHeight
    // 赋值 新的 => 旧的 
    this.setData({
      'touch.distance': distance,
      'touch.scale': newScale,
      'touch.scaleWidth': scaleWidth,
      'touch.scaleHeight': scaleHeight,
      'touch.diff': distanceDiff
    })
  },
  bindload: function (e) {
    // bindload 这个api是<image>组件的api类似<img>的onload属性 
    this.setData({
      'touch.baseWidth': e.detail.width,
      'touch.baseHeight': e.detail.height,
      'touch.scaleWidth': e.detail.width,
      'touch.scaleHeight': e.detail.height
    })
  }
})