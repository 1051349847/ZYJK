var app = getApp();
// var urls="192.168.3.182"
Page({

  data: {
    swiperImgs:'',
    swiperImga: '',
    url: app.url,//app url 地址192.168.3.182,
    wd:'',
    jd:'',
    conts:''
  },
  seach: function () {
    let that=this;
    let wd=this.data.wd;
    let jd=this.data.jd;
    let name=this.data.conts;
    let data={
      lat:wd,
      lng:jd,
      clinic_name:name
    }
    console.log(data)
    app.request('GET', '/v1/home/clinic', data).then(res => {
     
      that.setData({
        sw: res.data
      })
    }, res => {

    })
  },
  sss:function(e){
    console.log(e.detail.value)
    this.setData({
      conts: e.detail.value
    })
  },

  over: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let wd = this.data.wd;
    let jd = this.data.jd;
    let data = {
      lat: wd,
      lng: jd,
      id: id
    }
   
   
    app.request('GET', '/v1/home/clinic',data).then(res => {
   
      that.setData({
        swiperImgs: res.data
      })
      wx.reLaunch({
        url: '/pages/appointment/appointment?id=' + id + '&wd=' + wd + '&jd=' + jd,
      })
    }, res => {

    })

  },
  
  onLoad: function (options) {
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
       
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          wd: latitude,
          jd: longitude
        })
      
      }
    })


    app.request('GET', '/v1/home/click_search').then(res => {
     
      that.setData({
        swiperImga: res.data
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