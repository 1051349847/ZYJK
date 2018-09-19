
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yz: "",
    url: app.url,//预约
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送请求
    var that = this;
    let id = options.id;
    let data = {
      user_id: "335"
    }
    // 电子病例
    app.request("GET", "/v1/home/cases_lists").then(res => {
      // console.log(res)
      console.log(res.data[0].time)
      that.setData({
        yz: res.data
      })
     
    }, res => { })

    
  },
  goHouseInfos: function (e) {
    wx.navigateTo({
      url: '/pages/medical-partic/medical-partic?id=' + e.currentTarget.dataset.id,
    })
  },


})