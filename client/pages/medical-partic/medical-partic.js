var app = getApp();
// var urls="192.168.3.182"
Page({

  data: {
  
    zj: '',
    url: app.url,//app url 地址192.168.3.182,




  },
  onLoad: function (options) {
    let that = this;
    let id = options.id;
    let data = {
      id: id
    }
    app.request('GET', '/v1/home/cases_details', data).then(res => {
      console.log(res.data.address)
      that.setData({
        zj: res.data
      })
    }, res => {

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

  }

});