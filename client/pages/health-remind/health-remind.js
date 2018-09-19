
var app = getApp();
var eapi = getApp().url;
const date = new Date()
const years = []
const months = []

const days = []
const hours = []
const mins = [];
var year = date.getFullYear();
var month = date.getMonth() + 1
var day = date.getDate();
var monthsDays = [];//月份天数数组对象格式

//  var hour=date.getHours()
var min = date.getMinutes()

var d = new Date(year, month, 0);

for (let i = day; i <= d.getDate(); i++) {
  let data = {
    Month: month,
    Day: i
  }
  monthsDays.push(data);
}
for (let i = 0; i <= 24; i++) {
  // hour:i
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
    flag: true,
    url: app.url,
    date: [],
    yzs: "",
    ss: "",
    events: "",
    event:'',
    content: "",
    time: "",
    tx: '',
    idss: '',
  
    telphone: '',
    viewText: '',
    isShowTabLabelTwo: false, //判断是否禁用自定义输入框/是否禁用标签按钮
    h: ['0', '15', '30', '45', '59']
 
  },



  time: function (e) {
    this.setData({ //禁用自定义输入框
      // isShowTabLabel: true
    })
    let that = this
    let time = e.currentTarget.dataset.id;
    let viewDataSet = e.target.dataset;
    let viewText = viewDataSet.text;
    this.setData({
      idss: time || this.data.idss,
      viewDataSet: e.target.dataset,
      viewText: viewText,
      value: ''
    })
    let data = {
      id: time
    }
    app.request('GET', '/v1/home/remind_show', data).then(
      res => {
        that.setData({
          sjcont: res.data.content
        })
      }, res => { })

  },
  banTablabel: function () {
    this.setData({
      isShowTabLabelTwo: true
    })
  },
  getPhone: function (e) {
    var val = e.detail.value;
    console.log(val)
    this.setData({
      viewText: val,
      tel: val.length,
      idss: ''
    });
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
  // 时间选择
  bindChange: function (e) {
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

  getTx: function(e) {
    var val = e.detail.value;
    console.log(val)
    this.setData({
      tx: val

    });
  },
  events: function(e) {
    var val = e.detail.value;
    // console.log(val)
    this.setData({
      events: val

    });
  },

  content: function(e) {
    var val = e.detail.value;
    // console.log(val)
    this.setData({
      content: val

    });
  },
  timea: function(e) {
    var val = e.detail.value;
    console.log(val)
    this.setData({
      events: val

    });
  },
  a: function() {
    this.setData({
      flag: false
    })

  },
  c: function () {
    this.setData({
      flag: true
    })
  },
  b: function(options) {
    let that = this;
    let id = this.data.ss
    let data = {
      "id": id
    }
    app.request("GET", "/v1/home/remind_del", data).then(res => {
      // console.log(res)
      console.log(res)
      that.setData({
        yz: res.data
      })
      if (res) {
        wx.showLoading({

          success: function(res) {
            title: '删除成功'
            icon: 'success'
            // duration: 3000
            wx.navigateBack({
              url: '/pages/health/health',
            })
          }
        })
      }
    }, res => {})
  },

  over: function() {
    let that = this;
    let id = this.data.ss;
    let event = this.data.telphone;
    let sj = this.data.viewText;
    let time = this.data.time;
    let content = this.data.tx
    let months = this.data.month + '-';
    let days = this.data.day + '-';
    let hours = this.data.hour + ':';
    let mint = this.data.min
    let datas = months + days + hours + mint
    let data = {
      "id": id,
      "event": event || sj,
      "time": datas,
      "content": content,
    }
    console.log()
    app.request("POST", "/v1/home/remind_save", data).then(res => {
      that.setData({
        yz: res.data
      })
      if (res.data == "修改成功") {
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 2000,
          success: function(res) {
            wx.navigateBack({
              url: '/pages/health/health',
            })
          }
        })
      }
    }, res => {
      console.log(1)
      if (res.code == 40002) {
        wx.showToast({
          title: '修改失败',
          icon: 'none',
          duration: 2000
        })
      }
    })


  },
  onLoad: function(options) {
    // 发送请求

    let id = options.id;
    let data = {
      id: id
    }
    // 删除提醒
    app.request("GET", "/v1/home/remind_editor", data).then(res => {
      console.log(res)
      console.log(res.data.event)
      console.log(res.data.content)
      console.log(res.data.time)
      console.log(res.data.id)
      that.setData({
        yzs: res.data,
        ss: res.data.id,
        value: res.data.event,
        content: res.data.content,
        time: res.data.time
      })

    }, res => {})
    var pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象
      var prePage = pages[pages.length - 2];
      //关键在这里
      prePage.onLoad()
    }
    let that = this;
    /*
     * request()  发送http请求
     * method  get,post,put,delete
     * url     请求链接
     * data    请求数据
     * header  请求header
     * return  Promise
     * example app.request('get', 'login', {}).then()
     */
    app.request('GET', '/v1/home/remind_add').then(res => {

      that.setData({
        sj: res.data
      })
    }, res => {})

  },
})