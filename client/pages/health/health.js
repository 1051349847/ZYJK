var app = getApp()
var eapi = getApp().url;
var fa = 0;
var util = require("../../utils/date.js")
Page({
  data: {
    flag: false,
    flce: true,
    tx: '1',
    urls: app.url,
    times: '',
    imageUrl:'',
    title:'',
    // tid:'',
    ds:''
  },
  collect: function (e) {
    let that=this;
    let formId = e.detail.formId
    var data = {
      fmid: formId
    }
    app.request('GET', '/v1/home/msg_save', data).then(res => {
      
    }, res => { })


  },
  collect: function (e) {
    let that = this;
    let formId = e.detail.formId;
    console.log(formId)
    var data = {
      fmid: formId
    }
    app.request('GET', '/v1/home/msg_save', data).then(res => {
    }, res => { })
  },
  switch1Change:function(e){
    // console.log(e.target.id)
    console.log(e.currentTarget.dataset.id)
   this.setData({
     ds: e.currentTarget.dataset.id
   })
  
    if (e.detail.value==false){
       fa = 0
    }else{
      fa = 1 
    }   
    let that = this
    let data = {
      type: fa,
      id: this.data.ds
    }
    console.log(data)
    // return false
    app.request('POST','/v1/home/remind_check',data ).then(res => {
      console.log(res)
      that.setData({
          
      })
    }, res => {
      console.log(456)
    })
  },
  onLoad: function (options) {
    let that=this
    app.request('GET', '/v1/home/health').then(res => {
      console.log(res.data)
      that.setData({
        imageUrl: res.data.image,
        title:res.data.title
      })
    }, res => {
      console.log(456)
    })
    
  },

  onShow: function () {
    let that = this;
    app.request('GET', '/v1/home/remind').then(res => {
      console.log(res.data.datas[0].is_show)
      for (var i = 0; i < res.data.datas.length; i++) {
        res.data.datas[i].time = util.js_date_time(res.data.datas[i].time)
      }
      
      that.setData({
        txs: res.data.datas,
        tx: res.data.count,
        show: res.data.datas.is_show,
        tid: res.data.datas.id
      })

    }, res => { })
  },

  onShareAppMessage: function () {
    var that = this
    let title = '21'
    let user_info = wx.getStorageSync('userInfo')
    console.log(user_info)
    var article_id = wx.getStorageSync('userInfo').nickName + '坚持' + title + '天，就能养成好习惯';
    var titles=this.data.title;
    var path = '/pages/index/index?nickname=' + user_info.nickName + '&headpic=' + user_info.avatarUrl + '&habit_id=' + that.data.habit_id + '&habit_name=' + title;
    console.log(this.data.urls)
    console.log(this.data.imageUrl)
    return {
      title: titles,
      imageUrl: this.data.urls + this.data.imageUrl,
      path: path
    }
  },
  brand: function () {

  },
  // 用户授权回调
  // onGotUserInfo: function (e) {
  //   wx.setStorageSync("userInfo", e.detail.userInfo)
  //   wx.login({
  //     success: res => {
  //       wx.hideLoading();
  //       if (res.code) { //获取登录凭证码，随机的，有效期5分钟
  //         wx.getStorage({
  //           key: 'userInfo',
  //           success: function (resStorage) {
  //             wx.request({
  //               url: eapi + '/v1/user/outh_login',
  //               method: 'POST',
  //               data: {
  //                 code: res.code,
  //                 avatarUrl: resStorage.data.avatarUrl,
  //                 nickName: resStorage.data.nickName,
  //                 gender: resStorage.data.gender,
  //               },
  //               success: function (ress) {
  //                 wx.setStorageSync("access_token", ress.data.data.access_token)
  //               },
  //             })
  //           },
  //         })
  //       }
  //     }
  //   })
  // },
  // // 用户授权回调
  onGotUserInfo: function (e) {
    var that = this;
    let isExistUserInfo = wx.getStorageSync('userInfo');
    if (isExistUserInfo) {
      this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
      })
      if (wx.getStorageSync('userInfo')) {
        that.setData({
          btn: false
        })
        wx.hideLoading()
        wx.request({
          url: eapi + '/v1/user/outh_login', 
          method: "POST",
          header: {
            'x-access-token': wx.getStorageSync('access-token')
          },
          success: function (res) {
            console.log('/v1/user/outh_login');
            console.dir(res);
            that.setData({
              userInfo: res.data.data
            })
            
          },
      
        });
      }
    } else {
      wx.setStorageSync('userInfo', e.detail.userInfo)
      let userInfoValue = wx.getStorageSync('userInfo');
      if (userInfoValue) {
        wx.setStorageSync('userInfo', e.detail.userInfo) //存储用户本地基本信息
        app.login().then(res => {
          that.onShow()
        }, res => {
          console.error(res);
        });
      } else {
        console.error('用户点击拒绝授权！');
      }

    }

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
      url: '/pages/health-1/health-1'
    })
  },
  pressView: function (e) {
    var viewId = e.target.id;
    var viewDataSet = e.target.dataset;
    var viewText = viewDataSet.text;
    console.log(viewId); //输出点击的view的id，第二种情况就不重复写了
    console.log(viewText); //输出该文本
    if (viewText == 0) {
      viewText = 4
    }
  },
  brands: function (e) {
    // console.log(1)
    wx.navigateTo({
      url: '/pages/health-remind/health-remind?id=' + e.currentTarget.dataset.id
    })
  },
  nos: function (e) {
    wx.showToast({
      title: '默认提醒不可编辑',
      icon: 'none',
      duration: 1000,
      fail: function () {
        this.onLoad()
      }

    })
  },
}) 
