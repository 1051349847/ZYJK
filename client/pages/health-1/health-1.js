var app = getApp();


const date = new Date()
const years = []
const months = []

const days = []
const hours = []
const mins = [];
var year = date.getFullYear();
var month = date.getMonth() + 1
var day = date.getDate();
var monthsDays=[];//月份天数数组对象格式
//  var hour=date.getHours()
var min=date.getMinutes()
var d = new Date(year, month, 0);
for (let i = day; i <= d.getDate(); i++) {
  let data={
    Month:month,
    Day:i
  }
  monthsDays.push(data);
}
for (let i = 0; i <= 24; i++) {
  hours.push(i)
}
for (let i = min; i <= 59; i++) {
  mins.push(i)
}
var saz = months.concat(days)
Page({
  data: {
    months: monthsDays,
    days: days,
    hours: hours,
    mins: mins,
    index: 0,
    sj: "1",
    telphone: '',
    // sjs:'',
    tx: '',
    idss: '1',
    sjcont:'按时吃药，身体才健康',
    tel: '0',
    viewText: '吃药',
    isShowTabLabelTwo: false, //判断是否禁用自定义输入框/是否禁用标签按钮
    date: [],
    h:['0','15','30','45','59']
  },
  onLoad: function(options) {
    console.log(this.data.isShowTabLabelTwo)
    var pages = getCurrentPages();
    if (pages.length > 1) {
      var prePage = pages[pages.length - 2];
      prePage.onLoad()
    }
    let that = this;
    let id = options.id;
    let data = {
      "id": id
    }
    app.request('GET', '/v1/home/remind_add', data).then(res => {
      console.log(res.data[0].content)
      that.setData({
        sj: res.data,
        sjs: res.data.content
      })
    }, res => {})
  },
  onShow: function() {
    var that = this
    let month = that.data.months
    console.log(month)
    for (let i = 0; i < 7; i++) {
      months[i] = month[i]
      that.setData({
        monthes: months
      })
    }
  },

  time: function(e) {
    this.setData({ //禁用自定义输入框
      // isShowTabLabel: true
    })
    let that=this
    let time = e.currentTarget.dataset.id;
    let viewDataSet = e.target.dataset;
    let viewText = viewDataSet.text;
    this.setData({
      idss: time || this.data.idss,
      viewDataSet: e.target.dataset,
      viewText: viewText,
      value: ''
    })
    let data={
      id:time
    }
    app.request('GET', '/v1/home/remind_show', data).then(
      res => {
        that.setData({
          sjcont: res.data.content
        })
    }, res => { })

  },
  // 时间选择
  bindChange: function(e) {
    let that = this;
    const val = e.detail.value;
    console.log(that.data.months[val[0]]);
    
    console.log(that.data.mins)
    that.setData({
      months: that.data.monthes,
      month: that.data.months[val[0]].Month,
      day: that.data.months[val[0]].Day,
      hour: that.data.hours[val[1]],
      min: that.data.h[val[2]]
    })
    console.log(that.data.months[val[0]].Month)
    console.log(that.data.h[val[2]])
  },
  banTablabel: function() {
    this.setData({
      isShowTabLabelTwo: true,
      idss:8
    })

    console.log(this.data.isShowTabLabelTwo)
  },

  getPhone: function(e) {
    
    if (e.detail.value){
      this.setData({
        isShowTabLabelTwo: true
      })
      var val = e.detail.value;
      console.log(val)
      this.setData({
        viewText: val,
        tel: val.length,
        idss: ''
      });
    }else{
      this.setData({
        isShowTabLabelTwo: false
      })
    }
    console.log(this.data.isShowTabLabelTwo)

    
  },
  getTx: function(e) {
    var val = e.detail.value;
    this.setData({
      tx: val
    });
  },

  bandss: function() {
    wx.navigateBack({
      url: '/pages/health/health',
    })
  },

  band: function() {
    let that = this;
    var userName = this.data.viewText;
    var tel = this.data.tel;
    var tx = this.data.tx;
    let sj = this.data.viewText;
    console.log(userName)
    let months = this.data.month + '-';
    let days = this.data.day + '-';
    let hours = this.data.hour + ':';
    let mint = this.data.min
    let datas = months + days + hours + mint
    let data = {
      "event": userName,
      "time": datas,
      "content": tx || this.data.sjcont,
    }
    console.log(data)
    console.log(mint)
    // return false
    if (data.content == "") {
      wx.showToast({
        title: '必须填写提醒内容',
        icon: 'none',
        duration: 2000,
        fail: function() {
          this.onLoad()
        }
      })
    } else if (tel >= 12) {
      wx.showToast({
        title: '必须填写提醒内容',
        icon: 'none',
        duration: 2000,
        fail: function () {
          this.onLoad()
        }
      })
    
    } else {
      app.request('POST', '/v1/home/remind_save', data).then(res => {
        that.setData({
          sj: res.data
        })
        if (res.data) {
          wx.showToast({
            title: '健康提醒创建成功',
            duration: 3000,
            success: function() {
              wx.navigateBack({
                url: '/pages/health/health',
              })
            }
          })
        }
      }, res => {
        if (res.code == 40002) {
          wx.showToast({
            title: '输入信息有误',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
})