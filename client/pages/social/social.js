// pages/data/data.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kfUrls: '',//开放交流
    url: app.url,//app url 地址192.168.3.182,
    //

  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        console.log(latitude, longitude)
        var accuracy = res.accuracy
      }
    })
    /*
  * request()  发送http请求
  * method  get,post,put,delete
  * url     请求链接
  * data    请求数据
  * header  请求header
  * return  Promise
  * example app.request('get', 'login', {}).then()
  */
    let that = this;
    // 科室选择
    app.request('GET', '/v1/home/community').then(res => {
      console.log(res);
      that.setData({
        // console.log(res);
        kfUrls: res.data
      })
    }, res => { })//轮播图


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
