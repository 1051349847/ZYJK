var app = getApp();
var eapi = getApp().url;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    yz: "",
    url: app.url, //预约
    imageUrl: '',
    title:""
  },
  input: function(e) {
    console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    })
  },
  yzBut: function() {
    let that = this;
    if (that.data.value == "" || that.data.value == undefined) {
      wx.showToast({
        title: '请输入邀请码',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    app.request('GET', '/v1/home/bind', {
      code: that.data.value
    }).then(res => {
      if (res.code == 200) {
        console.log(11)
        wx.showToast({
          title: '邀请码绑定成功',
          icon: 'none',
          complete: function() {
            duration: 1500,
            wx.redirectTo({
              url: '/pages/vip-out/vip-out'
            })
          }

        })
      }
      console.log(res)
      that.setData({
        zj: res.data
      })
    }, res => {
      if (res.code == 40001) {
        wx.showToast({
          title: '请输入正确的邀请码！',
          icon: 'none',
          duration: 1500
        })
      } else if (res.code == 40003) {
        wx.showToast({
          title: '用户已绑定邀请码',
          icon: 'none',
          duration: 1500
        })
      } else if (res.code == 40004) {
        wx.showToast({
          title: '邀请码已过期',
          icon: 'none',
          duration: 1500
        })
      }
      else if (res.code == 40002) {
        wx.showToast({
          title: '邀请人数已达上限',
          icon: 'none',
          duration: 1500
        })
      }
      console.log(res)
    })

  },
  onLoad: function() {
    let that = this

    app.request('GET', '/v1/home/vip').then(res => {
      console.log(res.data.title+"asd")
      that.setData({
        imageUrl: res.data.image,
        title: res.data.title
      })
    }, res => {
      console.log(456)
    })
  },

  onShareAppMessage: function () {
    var that = this
    let title = '21'
    let user_info = wx.getStorageSync('userInfo')
    console.log(user_info)
    var article_id = wx.getStorageSync('userInfo').nickName + '坚持' + title + '天，就能养成好习惯';
    var titles = this.data.title
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