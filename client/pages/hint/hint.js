var app = getApp()
Page({
  data: {
    flag: true
  },
  a: function () {
    this.setData({ flag: false })
  },
  b: function () {
    this.setData({ flag: true })
  }
}) 
