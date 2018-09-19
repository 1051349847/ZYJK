// pages/share/share.js
const app = getApp();
var eapi = getApp().url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    head_pic: '../../images/picshare.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options)
   var that = this
   var headpic = options.headpic 
   var habit_id = options.habit_id
   var nickname = options.nickname
   var habit_name = options.habit_name
   that.setData({
     headpic: headpic,
     habit_id: habit_id,
     nickname: nickname,
     habit_name: habit_name
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
  onGotUserInfo: function (e) {
    console.log(e.detail.rawData)
    var that = this
    let habit_id = that.data.habit_id;
    that.setData({
      avatarUrl: e.detail.userInfo.avatarUrl,
      nickName: e.detail.userInfo.nickName,
    })
    wx.setStorageSync('userInfo', e.detail.userInfo)
    getApp().login(eapi, this); //授权
    wx.showLoading({
      title: '正在登陆',
      mask: true,
      success: function (res) {
        console.log(121)
        var interval = setInterval(function () {
          if (wx.getStorageSync('userInfo')) {
            clearInterval(interval);
            wx.hideLoading()
            wx.request({
              url: eapi + '/v1/habit/join?habit_id=' + habit_id, //仅为示例，并非真实的接口地址
              method: "GET",
              header: {
                'x-access-token': wx.getStorageSync('access-token')
              },
              success: function (res) {
                if (res.data.code == 200) {
                  wx.showToast({
                    title: '操作成功!',
                    icon: 'success',
                    duration: 1500
                  })
                  setTimeout(function () {
                    wx.switchTab({
                      url: '/pages/noHabit/noHabit',
                    })
                  }, 1500)
                } else if (res.data.code == 40006) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'loading',
                    duration: 1500
                  })
                  setTimeout(function () {
                    wx.switchTab({
                      url: '/pages/noHabit/noHabit',
                    })
                  }, 1500)
                }
              },
              fail: function (res) {
                console.log(222)
              }
            });
          }
        }, 1500);

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  home: function () {
    wx.switchTab({
      url: '../noHabit/noHabit',
    })
  },
  join: function (e) {
    let that = this;
    let habit_id = that.data.habit_id;
    //请求 分类的 标签列表
    if (wx.getStorageSync('access-token') == '') {

    } else {
      app.request('GET', '/v1/habit/join?habit_id=' + habit_id).then(function (res) {
        console.log(res.data)
        wx.startPullDownRefresh()
        if (res.code == 200) {
          wx.showToast({
            title: '操作成功!',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/noHabit/noHabit',
            })
          }, 1500)
        } else if (res.code == 40006) {

        }
      }, function (msg) {
        console.log(msg);//返回失败code
        //弹窗提醒
        wx.showModal({
          title: '加入失败',
          content: msg,
          // showCancel: false,
          confirmText: '去首页',
          confirmColor: '#249ff7',
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/noHabit/noHabit',
              })
            } else if (res.conceal) {

            }
          }
        })
      })
    }
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