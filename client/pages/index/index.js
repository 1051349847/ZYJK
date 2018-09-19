var app = getApp();
// var urls="192.168.3.182"
Page({

  data: {
    indicatorDots: true,
    circular: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {},
    isIpx: app.globalData.isIpx ? true : false,
    imgUrls: '',//轮播图
    url: app.url,//app url 地址192.168.3.182,
    zdfwUrl:'',
   //诊疗范围

    brand: [{
      icon: '../../images/problem.png',
      title: '每日一题',
      link: '/pages/data/data',
    }, {
      icon: '../../images/reminder.png',
      title: '健康提醒',
      link: '/pages/health/health'
    }, {
      icon: '../../images/activities.png',
      title: '教授的课',
      link: '/pages/events/events'
    }, {
      icon: '../../images/community.png',
      title: '开放社群',
      link: '/pages/social/social'
    }],
    diagnosti: [{
      icon: '../../images/diagnosti.png',
      link: '/pages/therapy/therapy'
    }],


    crange: '../../images/crange.png'
  },


  collect: function (e) {
    let that=this;
    let formId = e.detail.formId;
    console.log(formId)
    var data = {
      fmid: formId
    }
    app.request('GET', '/v1/home/msg_save', data).then(res => {
      
    }, res => { })


  },
  onLoad: function (options) {

    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })//用户位置
 /*
   * request()  发送http请求
   * method  get,post,put,delete
   * url     请求链接
   * data    请求数据
   * header  请求header
   * return  Promise
   * example app.request('get', 'login', {}).then()
   */
    app.request('GET', '/v1/home/lists').then(res => {
     
      that.setData({
        imgUrls: res.data
      })
    }, res => { }),//轮播图

      app.request('GET', '/v1/home/nav_lists').then(res => {
          // console.log(res);
          that.setData({
            zdfwUrl: res.data,
           
          })
      }, res => { })//诊疗范围
    },
  goHouseInfos: function (e) {
    wx.navigateTo({
      url: '/pages/therapy-to/therapy-to?id=' + e.currentTarget.dataset.id,
    })
  },
 
  

  onShow: function () {


  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },
  brand: function () {

  }

  
});