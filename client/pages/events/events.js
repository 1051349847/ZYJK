// pages/data/data.js
var app = getApp();

var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jsUrls: '',//教授的课
    url: app.url,//app url 地址192.168.3.182,
    //
    times:'',
    jss:''
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
   
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
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
    // 教授的课
    app.request('GET', '//v1/home/activity').then(res => {

      for (var i = 0; i < res.data.length; i++) {
        res.data[i].time = util.js_date_time(res.data[i].time)
      }
      console.log(res.data)
      that.setData({
        // console.log(res);
        jsUrls: res.data,
        jss:res.data.url
        
      })
    }, res => { })
    

  },
  navs: function (e) {
    console.log(e.currentTarget.dataset.url)
    let url = e.currentTarget.dataset.url
    console.log(url)
    wx.navigateTo({
      url: '/pages/nav/nav?url=' + url
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
