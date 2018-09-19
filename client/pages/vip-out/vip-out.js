var app=getApp()
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zjs:'',
    vipdate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  sdsa:function(){
    wx.redirectTo({
      url: '/pages/vip-user/vip-user',
    })
  },
  onLoad: function (options) {
    let that = this
    app.request('GET','/v1/home/company').then(res => {
      res.data.validity = util.js_date_time(res.data.validity)
      console.log(res.data.type)
      that.setData({
        zjs: res.data.company_name,
        vipdate: res.data.validity
      })
    }, res => {
      console.log(res)
    })
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