// pages/data/data.js
var app=getApp();
var eapi = getApp().url;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.url,//app url 地址192.168.3.182,
    datas:'',
    daId:"",
    q_id:'',
    topic: false,
    tcardzta: 'block',//初始卡片正面显示
    tcardztb: 'none',//初始卡片背面隐藏
    cardjd: '180deg',
    tcardsh: '1',
    imageUrl:'',
    title:''

  },
  band:function() {
    wx.navigateTo({
      url: '/pages/data-3/data-3'
    })
  },
  goHouseInfos:function(e){
    var that = this
    let qid = this.data.daId
    let id = e.currentTarget.dataset.id
    // console.log(qid,id)
    this.setData({
      topic: !this.data.topic
    })
    // console.log(this.data.topic)
    let data = {
      q_id: qid,
      id: id
    }
    console.log(id)
    app.request('GET', '/v1/home/topic', data).then(res => {
  
      that.setData({
        txs: res.data,
        dl: res.data.correct,
        hg: res.data.title_name,
        dn: res.data.answer[0].name,
        jx: res.data.parsing,
        msg: res.data.msg,
        status: res.data.status
      })
    }, res => { })
    if(this.data.status!==1){
      

    }
  },
  /**
  * 点击翻转
  */
  cardfz: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    if (id == '1') {
      setTimeout(function () {
        that.setData({ tcardzta: 'none' });
      }, 800);
      setTimeout(function () {
        that.setData({ tcardztb: 'block', tcardsh: '1' });
      }, 1000);
      that.setData({ cardjd: '0deg' });
    } else {
      setTimeout(function () {
        that.setData({ tcardztb: 'none' });
      }, 600);
      setTimeout(function () {
        that.setData({ tcardzta: 'block', tcardsh: '1' });
      }, 1000);
      that.setData({
        cardjd: '180deg',
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that=this;
    let id=options.id;
    let data={

    }
    app.request('GET', '/v1/home/topic').then(res => {
        that.setData({
          datas: res.data,
          da: res.data.answer,
          daId: res.data.q_id,
          dataTm: res.data.title_name
        })
      }, res => { })


    app.request('GET','/v1/home/image').then(res => {
      console.log(res.data.image)
      that.setData({
        imageUrl: res.data.image,
        title:res.data.title
      })
    }, res => { 
      console.log(456)
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
    var that = this
    let title = that.data.datas.title_name
    let user_info = wx.getStorageSync('userInfo')
    console.log(user_info)
    var article_id = title;
    var titles = this.data.title;
    var path = '/pages/data/data?habit_id=' + that.data.habit_id;
    var img = this.data.imageUrl
    var url=this.data.url
    console.log(url+img)
    return {
      title: titles,
      imageUrl: url + img,
      path: path
    }
  }
})
