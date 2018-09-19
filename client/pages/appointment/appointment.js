// pages/data/data.js
var app = getApp();
var eapi = getApp().url;
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ksUrls: '', //科室选择
    url: app.url,
    dmUrls: '',
    userInfo: "",
    distance: '',
    dzImg: '',
    dzName: '',
    zs: '',
    vip: '',
    dmId: "",
    color: "#ff6f10",
    idx: 0,
    idss: '',
    id: '',
    lat: "",
    dID: '',
    Height: 0,
    scale: 12,
    lat: 0,
    lng: 0,
    title:""

  },
  /**
   * 生命周期函数--监听页面加载
   */
  // map: function(options) {
  //   wx.navigateTo({
  //     url: '/pages/map/map',
  //   })
  // },
  onLoad: function(options) {


    app.request('GET', '/v1/home/order').then(res => {
      console.log(res.data.image)
      that.setData({
        imageUrl: res.data.image
      })
    }, res => {
      console.log(456)
    })
    //店面搜索
    app.request('GET', '/v1/home/clinic', {
      lat: 22.53332,
      lng: 113.93041
    }).then(res => {
      console.log(res)
      that.setData({
        dmUrls: res.data[0].clinic_name,
        dmId: res.data[0].id,
        distance: res.data[0].distance,
        dzImg: res.data[0].img,
        dzName: res.data[0].address,
        lat: res.data[0].lat,
        lng: res.data[0].lng,

      })
    }, res => {})
    var lat = options.wd
    var lng = options.jd
    var id = options.id
    let data = {
      lat: lat,
      lng: lng,
      id: id
    }
    app.request('GET', '/v1/home/clinic', data).then(res => {
      console.log(res)
      that.setData({
        dzName: res.data[0].address,
        dzImg: res.data[0].img,
        dmUrls: res.data[0].clinic_name,
        distance: res.data[0].distance,
        dID: res.data[0].id,
      })
    }, res => {})
    let that = this;
    // 科室选择
    app.request('GET', '/v1/home/department').then(res => {
        that.setData({
          ksUrls: res.data,
          id: res.data[0].id
        })
      }, res => {}),
      //选择时间
      app.request('GET', '/v1/home/clinic_time', {
        "dep_id": '4'
      }).then(res => {
        that.setData({
          zs: res.data
        })
      }, res => {})

    app.request('GET', '/v1/home/order').then(res => {
    
      that.setData({
        imageUrl: res.data.image,
        title: res.data.title
      })
    }, res => {
      console.log(456)
    })



  },
  datas: function(e) {
    let that = this;
    let id = e.currentTarget.dataset.id
    let data = {
      "clinic_id": that.data.dmId,
      "dep_id": id,
    }

    this.setData({
      id: id
    })

    app.request('GET', '/v1/home/clinic_time', data).then(res => {
      that.setData({
        zs: res.data
      })
    }, res => {})
  },
  band: function() {
    wx.navigateTo({
      url: '/pages/serach/serach?id' + this.data.dmId
    })

  },
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

  // // 用户授权回调
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
  // 立即预约
  logins: function() {
    let that = this;
    let ids = this.data.idss;
    let ida = this.data.dID
    let id = this.data.id;
    let data = {
      "clinic_id": ida || this.data.dmId,
      "time_id": ids

    }
    
    console.log(data)
 
    // return false
    // 判断是否选取时间
    if (id == "") {
      wx.showToast({
        title: '请选择预约时间段',
        icon: 'none',
        duration: 1500
      })
      // console.log(1)
      // return false
    }
    app.request('GET', '/v1/home/members').then(res => {
      that.setData({
        vip: res.data
      })

      if (res.data.type  == 1) {
        app.request('GET', '/v1/home/promptly', data).then(res => {

          console.log(res)
          that.setData({
            ysa: res.data
          })
          if (res.data.status == 2) {
            console.log(res.data.status == 2)
            wx.showModal({
              title: '提示',
              content: '预约成功',
              showCancel: false,
              confirmColor: '#f18d00',
              confirmText: '确定',

              success: function(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/book/book',
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }, res => {
          console.log(4566);
          if (res.code == 40002) {
            wx.showToast({
              title: '请选择时间段',
              icon: 'none',
              duration: 1500
            })
          }
          // 状态=1 已经预约
          if (res.data.status == 1) {
            wx.showModal({
              title: '提示',
              content: '您已预约该科室，请勿重复预约！',
              showCancel: false,
              confirmColor: '#f18d00',
              confirmText: '确定',
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          // 状态=0 没有进行实名认证
          if (res.code == 40001) {
            console.log(2)
            wx.showModal({
              title: '提示',
              content: '请先您实名认证！',
              confirmColor: '#f18d00',
              showCancel: false,
              confirmText: '确定',

              confirmColor: '#f18d00',

              success: function(res) {
                if (res.confirm) {
                  wx: wx.navigateTo({
                    url: '/pages/real_two/real_two',
                    // success: function(res) {},
                    // fail: function(res) {},
                    // complete: function(res) {},
                  })
                  console.log('用户点击确定')
                }
                else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }

        })
      } else if (res.data.type==3){
        wx.showModal({
          title: '提示',
          content: '医疗室诊疗服务只对会员开放',
          cancelText: '联系客服',
          confirmText: '我是会员',
          confirmColor: '#f18d00',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/vip-user/vip-user',
              })
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
              wx.makePhoneCall({
                phoneNumber: '4009916120'
              })
            }
          }
        })
      }
    }, res => {})
  },

  time: function(e) {
    console.log(e.currentTarget.dataset.id)
    let time = e.currentTarget.dataset.id
    this.setData({
      idss: time
    })
  },
  map: function() {
    let that = this;
    var data_lat = '';
    var data_lng = '';
    /*parseInt  字符串 转数字  */
    // data_lat = (that.data.data_lat).toPrecision(5)
    // data_lat = parseInt(that.data.lat)
    // data_lng = parseInt(that.data.lng)
    data_lat = that.data.data_lat
    data_lng = that.data.data_lng
    console.log(data_lat)
    console.log(data_lng)
    wx.openLocation({
      latitude: 22.51919733337633,
      longitude: 113.92301682382822,
      address: true,
      scale: 18,
      name: that.data.dmUrls,
      address: that.data.dzName
    })
  },
  onShareAppMessage: function() {
    var that = this
    let title = '21'
    let user_info = wx.getStorageSync('userInfo')
    console.log(user_info)
    var article_id = wx.getStorageSync('userInfo').nickName + '坚持' + title + '天，就能养成好习惯';
    var titles=this.data.title
    var path = '/pages/index/index?nickname=' + user_info.nickName + '&headpic=' + user_info.avatarUrl + '&habit_id=' + that.data.habit_id + '&habit_name=' + title;
    console.log(this.data.url)
    console.log(this.data.imageUrl)
    console.log(title)
    return {
      title: titles,
      imageUrl: this.data.url + this.data.imageUrl,
      path: path
    }
  },


})