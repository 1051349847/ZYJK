var app = getApp();
// var urls="192.168.3.182"

Page({

  data: {
    indicatorDots: true,
    circular: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    zj:'',
    zjname:'',
    url: app.url,//app url 地址192.168.3.182,
    currentTab: "",
    count:'',
    counts:'1',
    indexs:'1',
    indes:''
  },
  swichNavs: function (e) {
    let that = this;
    that.setData({
      currentTab: this.data.indes+1
    });
    // console.log(this.data.currentTab)

    
  },
  
  swichNav: function (e) {
    let that = this;
    that.setData({
      currentTab: this.data.indes-1
    });
  },
  bindChange:function(e){
    console.log(e.detail.current)
    this.setData({
      indexs: e.detail.current+1,
      indes: e.detail.current,
    })
  
  },


  slide:function(){
    wx.switchTab({
      url:'/pages/appointment/appointment'
    })
  },
  onLoad: function (options) {
    let that = this;
    let id=options.id;
    let data={
      id:id
    }
    app.request('GET', '/v1/home/scope',data).then(res => {
      console.log(res.data.count)
      that.setData({
        zj: res.data.datas,
        zjname: res.data.datas[0].name,
        count: res.data.count,
        counts: res.data.count
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