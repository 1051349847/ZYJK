var app = getApp()
Page({
  data: {
    flag: true,
    flce: true
  },
  a: function () {
    this.setData({ flag: false })
  },
  b: function () {
    this.setData({ flag: true })
  },
  c: function () {
    this.setData({ flce: false })
  },
  d: function () {
    this.setData({ flce: true })
  },
  band: function () {
    wx.navigateTo({
      url: '/pages/health-one/health-one'
    })
  }
}) 
