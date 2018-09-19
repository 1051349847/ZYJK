// pages/goCard/goCard.js
var eapi = getApp().url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrBgImagePath: '../../images/wechat.jpg',
    id: '',
    add_times: '',
    pathes: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(wx.getStorageSync('userInfo'))
    var name = wx.getStorageSync('userInfo')
    var nickName = name.nickName
    var id = options.id
    that.setData({
      id: id
    })

    wx.showLoading({
      title: '图片生成中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    wx.request({
      url: eapi + '/v1/punch/card?mood_id=' + id, //仅为示例，并非真实的接口地址
      method: "GET",
      header: {
        'x-access-token': wx.getStorageSync('access-token')
      },
      success: function (res) {
        wx.downloadFile({
          url: res.data.data.picture, //仅为示例，并非真实的资源
          success: function (ress) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (ress.statusCode === 200) {
              console.log(ress)
              var path = ress.tempFilePath
              that.setData({
                pathes: path
              })
              console.log(that.data.pathes)
              let pic = that.data.pathes
              wx: wx.getSystemInfo({
                success: function (res) {
                  console.log(res.windowHeight)
                  that.setData({
                    pixelRatio: res.pixelRatio,
                    windowWidth: res.windowWidth,
                    windowHeight: res.windowHeight
                  })
                }
              })
              // 画图开始
              // 根据像素比绘画不同的图片
              let ctx = wx.createCanvasContext('myCanvas');
              // 画布宽高
              ctx.fillStyle = "white";
              ctx.fillRect(0, 0, that.data.windowWidth, that.data.windowHeight);
              let ctxW = that.data.windowWidth;
              // let ctxH = this.data.windowHeight - 80;
              let ctxH = that.data.windowHeight;
              // 默认像素比
              let pixelRatio = that.data.pixelRatio;
              // 屏幕系数比，以设计稿375*667（iphone7）为例
              let XS = that.data.windowWidth / 375;
              ctx.fillRect(10, 10, res.windowWidth, res.windowHeight)
              console.log(XS)
              ctx.setFontSize(20)
              ctx.setFillStyle('#249ff7');
              ctx.fillText(res.data.data.day, 40 * XS, 40 * XS, ctxW / 2 - 26 * XS, 120 * XS)
              ctx.setFontSize(14)
              ctx.setFillStyle('#333333');
              ctx.fillText(res.data.data.habit_name, 40 * XS, 70 * XS, ctxW / 2 - 26 * XS, 120 * XS)
              ctx.setFontSize(14)
              ctx.setFillStyle('#333333');
              ctx.fillText(res.data.data.add_time, 40 * XS, 100 * XS, ctxW / 2 - 26 * XS, 600 * XS)
              ctx.drawImage(pic, 40 * XS, ctxH / 2 - 180 * XS, ctxW / 2 + 10 * XS, 300 * XS);
              ctx.setFontSize(14)
              ctx.setFillStyle('#333333');
              ctx.fillText(res.data.data.content, 40 * XS, 400 * XS)
              ctx.setFontSize(14)
              ctx.setFillStyle('#333333');
              ctx.fillText('by' + nickName, 280, 440 * XS, ctxW / 2 - 26 * XS, 600 * XS)
              ctx.setFontSize(14)
              ctx.setFillStyle('#333333');
              ctx.fillText('余生很贵，不懈努力，', 140, 480 * XS, ctxW / 2 - 26 * XS, 600 * XS)
              ctx.drawImage(that.data.qrBgImagePath, 280, 450, 80, 80);
              ctx.setFillStyle('#333333');
              ctx.fillText('期待遇到更好的自己！', 140, 500 * XS, ctxW / 2 - 26 * XS, 600 * XS)
              ctx.setFontSize(12)
              ctx.fillText('组团打卡', 218, 520 * XS, ctxW / 2 - 26 * XS, 600 * XS)
              ctx.stroke();
              ctx.draw();





              




              
            }
          }
        })
        
      },
      fail: function (res) {

      }
    });

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
  // 保存图片
  saveImage: function (e) {
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(result) {
            wx.showToast({
              title: '图片保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail(result) {
            wx.showToast({
              title: '图片保存失败',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
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