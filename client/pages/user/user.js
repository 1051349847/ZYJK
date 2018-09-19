var app = getApp();
var eapi = getApp().url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: true,
    zjs: "",
    vips: '0'
  },
  onLoad: function(options) {
    let that = this
    app.request('GET', '/v1/home/members').then(res => {
      console.log(res.data.type)
      that.setData({
        vips: res.data.type
      })
    }, res => {})
  },
  onReady: function() {
    
  },
  onShow:function(){
    this.onLoad()
  },
  //   onShow: function() {
  //     wx.checkSession({
  //       success: function () {
  //         //session 未过期，并且在本生命周期一直有效
  //       },
  //       fail: function () {
  //         //登录态过期
  //         wx.login() //重新登录

  //   }
  // })

  //     var userInfo = wx.getStorageSync('userInfo')
  //     if (!userInfo) {
  //       this.setData({
  //         userInfo: true
  //       })
  //     } else {
  //       this.setData({
  //         userInfo: false
  //       })
  //     }
  //   },
  band: function() {
    wx.navigateTo({
      url: '/pages/record/record'
    })
  },
  v1: function() {
    let that = this
    app.request('GET', '/v1/home/members').then(res => {
      that.setData({
        zjs: res.data.type,
      })
      if (res.data.type == 3) {
        wx.showToast({
          title: '您的会员已过期',
          duration: 2000,
          icon: "none",
          complete: function() {
            wx.navigateTo({
              url: '/pages/vip-user/vip-user',
            })
          }
        })
      }
      if (this.data.zjs == 1) {
        wx.navigateTo({
          url: '/pages/vip-out/vip-out',
        })
      }
      if (this.data.zjs == 0) {
        wx.navigateTo({
          url: '/pages/vip-user/vip-user',
        })
      }
    }, res => {
      console.log(res.code)

    })

  },
  y1: function() {
    wx.navigateTo({
      url: '/pages/book/book'
    })
  },
  d1: function() {
    wx.navigateTo({
      url: '/pages/medical/medical'
    })
  },
  onShareAppMessage: function() {

  },
  // 用户授权回调
  // onGotUserInfo: function (e) {
  //   var that = this;
  //   let isExistUserInfo = wx.getStorageSync('userInfo');
  //   if (isExistUserInfo) {
  //     this.setData({
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       nickName: e.detail.userInfo.nickName,
  //     })
  //     if (wx.getStorageSync('userInfo')) {
  //       that.setData({
  //         btn: false
  //       })
  //       wx.hideLoading()
  //       wx.request({
  //         url: eapi + '/v1/user/outh_login',
  //         method: "POST",
  //         header: {
  //           'x-access-token': wx.getStorageSync('access-token')
  //         },
  //         success: function (res) {
  //           console.log('/v1/user/outh_login');
  //           console.dir(res);
  //           that.setData({
  //             userInfo: res.data.data
  //           })

  //         },

  //       });
  //     }
  //   } else {
  //     wx.setStorageSync('userInfo', e.detail.userInfo)
  //     let userInfoValue = wx.getStorageSync('userInfo');
  //     if (userInfoValue) {
  //       wx.setStorageSync('userInfo', e.detail.userInfo) //存储用户本地基本信息
  //       app.login().then(res => {
  //         that.onShow()
  //       }, res => {
  //         console.error(res);
  //       });
  //     } else {
  //       console.error('用户点击拒绝授权！');
  //     }

  //   }

  // },

  onGotUserInfo: function (e) {
    wx.setStorageSync("userInfo", e.detail.userInfo)
    wx.login({
      success: res => {
        wx.hideLoading();
        if (res.code) { //获取登录凭证码，随机的，有效期5分钟
          wx.getStorage({
            key: 'userInfo',
            success: function (resStorage) {
              wx.request({
                url: eapi + '/v1/user/outh_login',
                method: 'POST',
                data: {
                  code: res.code,
                  avatarUrl: resStorage.data.avatarUrl,
                  nickName: resStorage.data.nickName,
                  gender: resStorage.data.gender,
                },
                success: function (ress) {
                  wx.setStorageSync("access_token", ress.data.data.access_token)
                },
              })
            },
          })
        }
      }
    })
  },

})