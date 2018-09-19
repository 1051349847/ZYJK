Page({
  data: {
    animationData: {}
  },
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation
    animation.rotate3d(0 , 180,0,360).step();
    

    this.setData({
      animationData: animation.export()
    })

  },
  band1:function(){
    wx.navigateTo({
      url: '/pages/data-2/data-2'
    })
  },
  band2:function(){
    wx.navigateTo({
      url: '/pages/data-1/data-1'
    })
  }
})