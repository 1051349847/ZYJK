var app = getApp();
var interval = null //倒计时函数
Page({
  data: {
    name: '',
    sfz: '',
    yzm: '',
    phone: '',
    mm: '',
    gd: '',
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 61
  },
  // 获取验证码
  hzm: function() {
    let that = this;
    let phone = this.data.phone;
    console.log(phone)
    let data = {
      mobile: phone
    }
    // return false
    app.request("POST", "/v1/user/send_sms_demo", data).then(res => {
      console.log(res)
      that.setData({
        mm: res.data.code_id
      }, res => {})
    })
  },
  // 姓名
  names: function(e) {
    var val = e.detail.value;

    this.setData({
      name: val
    });
  },
  // 身份证
  sfz: function(e) {
    var val = e.detail.value;
    val = val.replace(/[\W]/g, '');
    this.setData({
      sfz: val
    });
  },

  // 手机号码
  phone: function(e) {
    var val = e.detail.value;
    val = val.replace(/[\u4E00-\u9FA5`~!@#$%^&*()_+<>?:"{},.\/;'[\]\-\sa-zA-Z]*/g, "");
    this.setData({
      phone: val
    });
  },
  // 验证码
  yzm: function(e) {
    var val = e.detail.value;
    val = val.replace(/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]\-\sa-zA-Z]*/g, "");
    this.setData({
      yzm: val

    });
  },

  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  hzm:function() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })

    let phone = this.data.phone;
    console.log(phone)
    let data = {
      mobile: phone
    }
    if (this.data.phone == "") {
      wx.showToast({
        title: '请输入手机号吗',
        icon: 'none',
        duration: 2000
      })
      return false
    }else{
      app.request("POST", "/v1/user/send_sms_demo", data).then(res => {
        console.log(res)
        that.setData({
          mm: res.data.code_id
        }, res => {

          if (res.code == 0) {
            wx.showToast({
              title: '请输入正确的手机号吗',
              icon: 'none',
              duration: 2000
            })
          }
        })
      })    
    }
    // return false
   
  },



  // user_id / 是 / 用户id
  // user_name / 是 / 用户姓名
  // id_number / 是 / 用户身份证号
  // mobile / 是 / 用户手机号
  // code / 是 / 验证码
  good: function() {
    let that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var name = this.data.name;
    var phone = this.data.phone;
    var yzm = this.data.yzm;
    var sfz = this.data.sfz;
    var mm = this.data.mm;
    let data = {
      "user_name": name,
      "id_number": sfz,
      "mobile": phone,
      "code": yzm,
      "code_id": mm,
    }
    console.log(data)
    if (this.data.name == "") {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.phone == "") {
      wx.showToast({
        title: '请输入手机号吗',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.sfz == "") {
      wx.showToast({
        title: '请输入身份证号码',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.yzm==""){
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.phone.length !== 11 || !myreg.test(phone)){
      wx.showToast({
        title: '请正确的手机号码',
        icon: 'none',
        duration: 2000
      })
      console.log(this.data.phone.length)
    }
    else {
      app.request("POST", "/v1/user/check_code_demo", data).then(res => {
        if (res.msg == "绑定成功") {
          wx.showLoading({
            title: '实名认证成功',
            success: function(e) {
              wx.redirectTo({
                url: '/pages/book/book',
              })
            }
          })

        }
        that.setData({
          gd: res.data
        }, res => {
          if(res.code==422){
            wx.showToast({
              title: '请正确的验证码',
              icon: 'none',
              duration: 2000
            })
          }
        })
      })

    }

  }
})