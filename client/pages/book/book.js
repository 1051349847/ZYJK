var app = getApp();
var util = require("../../utils/date.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    yz: "", //预约
    url: app.url,
    ss: "",
    yzs: '',
    dat:''
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  onReady: function () {
    // 发送请求
    let that = this
    let data = {
      my_appoint: "0"
    }
    app.request("GET", "/v1/home/my_appoint", data).then(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].time = util.js_date_time(res.data[i].time)
      }
      that.setData({
        yz1: res.data,
        dat: res.data.time
      })
      this.onLoad()
    }, res => { })
  },
  onshow: function () {
    this.onReady()
  },
  swichNav1: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    let data = {
      my_appoint: "0"
    }
    app.request("GET", "/v1/home/my_appoint", data).then(res => {
      console.log(res.data[0].time)
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].time = util.js_date_time(res.data[i].time)
      }
      that.setData({
        yz1: res.data,
        dat:res.data.time
      })
    }, res => { })
  },
  swichNav2: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    let data = {
      my_appoint: "2"
    }
    app.request("GET", "/v1/home/my_appoint", data).then(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].time = util.js_date_time(res.data[i].time)
      }
      // console.log(res.data)
      that.setData({
        yz2: res.data
      })
    }, res => { })
  },
  swichNav3: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    let data = {
      my_appoint: "1"
    }
    app.request("GET", "/v1/home/my_appoint", data).then(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].time = util.js_date_time(res.data[i].time)
      }
      // console.log(res.data)
      that.setData({
        yz3: res.data
      })
    }, res => { })
  },
  bindChange: function(e) {
    var current = e.detail.current;
    this.setData({
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
    // console.log("bindChange:" + current);
  },
  // 已完成预约
  navTabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    // var ss = e.currentTarget.id;
    let that = this
    let ss = e.currentTarget.id
    let data = {
      "my_appoint": ss
    }
    console.log(data)
    return false
    app.request("GET", "/v1/home/my_appoint", data).then(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].time = util.js_date_time(res.data[i].time)
      }
      console.log(res.data)
      that.setData({
        yz: res.data
      })
    }, res => {})

  },
  // 取消预约

  yss: function(e) {
    console.log(e.target.dataset.id)
    let that = this;
    let id = e.target.dataset.id;
    let data = {
      id: id,
      my_appoint: 2
    }
    console.log(data)
    // return false
    app.request("GET", "/v1/home/my_appoint", data).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '取消预约成功',
          duration: 3000,
          // success: function () {
          //   wx.navigateBack({
          //     url: '/pages/book/book',
          //   })
          // }
        })
        this.onReady()
        console.log(213)
      }
      that.setData({
        yzs: res.data
      }), res => {
        if(res.code==40001){
          wx.showToast({
            title: '已分配医生，无法取消',
            icon: 'none',
            duration: 2000,
           
          })
        }
      }
    })

  },
  
  zc: function() {
    wx.switchTab({
      url: '/pages/appointment/appointment',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})