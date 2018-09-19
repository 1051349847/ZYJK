Page({
  data: {
    Height: 0,
    scale: 12,
    latitude: "22.553147",
    longitude: "114.071045",

  },
click: function (e) {
    
  },

  onLoad: function() {
    wx.openLocation({
      latitude: 23.362490,
      longitude: 116.715790,
      address:true,
      scale: 18,
      name: '华乾大厦',
      address: '金平区长平路93号'
    })

    // var _this = this;

    // wx.getSystemInfo({
    //   success: function(res) {
    //     //设置map高度，根据当前设备宽高满屏显示
    //     _this.setData({
    //       view: {
    //         Height: res.windowHeight
    //       }
    //     })
    //   }
    // })

    // wx.getLocation({

    //   type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
    //   success: function(res) {
    //     console.log(_this.data.latitude)
    //     _this.setData({

    //       latitude: res.latitude,
    //       longitude: res.longitude,
    //       // latitude: res.latitude,
    //       // longitude: res.longitude,
    //       // latitude: _this.data.latitude,
    //       // longitude: _this.data.longitude,
    //       markers: [{
    //         id: "1",
    //         // latitude: 22.553147,
    //         // longitude: 114.071045,
    //         latitude: _this.data.latitude,
    //         longitude: _this.data.longitude,
    //       }],
    //     })
    //   }

    // })

  },

  // regionchange(e) {
  //   console.log("regionchange===" + e.type)
  // },

  //点击merkers
  // markertap(e) {
  //   console.log(e.markerId)

  //   wx.showActionSheet({
  //     itemList: ["A"],
  //     success: function(res) {
  //       console.log(res.tapIndex)
  //     },
  //     fail: function(res) {
  //       console.log(res.errMsg)
  //     }
  //   })
  // },
})