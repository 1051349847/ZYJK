// pages/data_ correct/data_ correct.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    da:"",
    urls: app.url,
    jx:'',
    hg:'',
    dl:'',
    dn:'',
    msg:""

  },

  /**
   * 生命周期函数--监听页面加载
   */

//   q_id| 题目id
// title_name / 题目
// answer / 答案
// id / 答案id
// name / 答案内容
// num  / 此题被答次数
// correct_num / 回答正确次数
// correct / 回答正确率
// parsing / 问题解析
// status  / 0 回答错误 1 回答正确
  onLoad: function (options) {
    let that=this;
    let id = options.id;
    let q_id = options.q_id;
    let data={
      "q_id": q_id,
      "id":id
    }
    console.log(id)
    app.request('GET', '/v1/home/topic',data).then(res => {
      console.log(res.data.correct);
      console.log(res.data.title_name);
      console.log(res.data.answer[0].name);
      that.setData({
        txs: res.data,
        tx: res.data.count,
        dl: res.data.correct,
        hg: res.data.title_name,
        dn: res.data.answer[0].name,
        jx: res.data.parsing,
        msg: res.data.msg,

      })
    }, res => { })
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