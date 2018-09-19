//app.js

const eapi = 'https://zuoyou.lanwang168.com'; //默认访问后台一级域名链接（页面全局变量）
//app.js
var util = require('utils/util.js');
// const eapi = 'https://vjgy.lanwang168.com'; //默认访问后台一级域名链接（页面全局变量）
App({
  onLaunch: function () { },
  // 获取用户信息函数
  getUserInfo: function (cb) {
    var that = this
    // console.log(this.globalData.userInfo)
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  url: 'https://zuoyou.lanwang168.com', //默认访问后台一级域名链接（页面局部变量）
  login: function (eapi, that) { //用户登入
    wx.showLoading({
      title: '正在登录...',
    })
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          wx.hideLoading();
          if (res.code) { //获取登录凭证码，随机的，有效期5分钟
            wx.getStorage({
              key: 'userInfo',
              success: function (resStorage) {
                console.log(123213)
                // 请求后台登录接口
                wx.request({
                  url: "https://zuoyou.lanwang168.com" + '/v1/user/outh_login',
                  
                  method: 'POST',
                  data: {
                    code: res.code, //获取openid的话 需要向后台传递code,利用code请求api获取openid
                    avatarUrl: resStorage.data.avatarUrl, //这些是用户点击接受授权后获取并缓存到的用户基本信息，获取用户头像
                    nickName: resStorage.data.nickName, //获取昵称
                    gender: resStorage.data.gender, //获取性别
                  },
                  success: function (ress) {
                    // 登录成功，后台返回用户相关数据
                    if (ress.statusCode == 200) {
                      // 后台返回数据的状态码判断
                      if (ress.data.code == 200) {
                        wx.setStorageSync("user", ress.data.data) //注意字段：refresh_token用于刷新新的token
                        wx.setStorageSync("access_token", ress.data.data.access_token)
                        var value = wx.getStorageSync('access_token')
                        if (value) {
                          // Do something with return value
                          console.log('获取到的新token:' + value);
                          resolve(); //返回登录结果
                          console.log('登录成功啦');
                        }


                      }

                    } else if (ress.statusCode === 404) {
                      reject('未找到页面(404)')
                    } else if (ress.statusCode === 500) {
                      reject('服务器错误(500)')
                    } else if (ress.statusCode === 422) {
                      reject('422请求格式正确，但是由于含有语义错误，无法响应。')
                    } else {
                      // 其他未知错误
                      reject(ress)
                    }
                  },
                  fail: function (ress) {
                    // 错误接口拦截
                    // util.showBusy(ress.errMsg);
                  }
                })
              },
              fail: function (resStorage) {
                // 错误接口拦截
                // util.showBusy(resStorage.errMsg);

              }
            })
          }
        }
      })
    })
  },

  /*
   * http()  发送带有token的http请求
   * method  get,post,put,delete
   * url     请求链接
   * data    请求数据
   * return  Promise
   * example app.http('get', 'login', {}).then()
   */
  http: function (method, api, data = {}, header = {}) {
    header = Object.assign({
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'x-access-token': wx.getStorageSync('access_token'),
    }, header)
    return new Promise((resolve, reject) => {
      wx.request({
        url: eapi + api,
        data: data,
        method: method,
        header: header,
        success: function (r) {
          console.log(r)
          if (r.statusCode == 200) {
            if (r.data.code == 200) {
              resolve(r.data)
            } else if (r.data.code == 20001) {
              resolve(r.data)
            } else {
              reject(r.data.msg);
            }
          } else if (r.statusCode === 404) {
            reject('未找到页面(404)')
          } else if (r.statusCode === 500) {
            reject('服务器错误(500)')
          } else if (r.statusCode === 422) {
            reject(r.data)
          } else {

            console.log(22)
            reject('111')
          }
        },
        fail: function (r) {
          console.log(12)
          reject(r.errMsg || '出现错误(http fail)')
        }
      })
    })
  },
  /*
   * request()  发送http请求
   * method  get,post,put,delete
   * url     请求链接
   * data    请求数据
   * header  请求header
   * return  Promise
   * example app.request('get', 'login', {}).then()
   */
  request: function (method, api, data = {}, header = {}) {
    let that = this;
    header = Object.assign({
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'x-access-token': wx.getStorageSync('access_token'),
    }, header)
    wx.showLoading({
      title: '加载中...',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: eapi + api,
        data: data,
        method: method,
        header: header,
        success: function (r) {
          wx.hideLoading();
          if (r.statusCode == 200) {
            if (r.data.code == 200) {
              resolve(r.data)
            } else if (r.data.code == 20001) {
              resolve(r.data)
            } else {
              reject(r.data.msg);
            }
          } else if (r.statusCode === 404) {
            reject('未找到页面(404)')
          } else if (r.statusCode === 500) {
            reject('服务器错误(500)')
          } else if (r.statusCode === 422) {

            reject(r.data)
            if (r.data.code == 40005) {
              // 需要用户重新登录，获取新的token
              that.login().then(resLogin => {
                // 登录完成，用户需要重新请求该api
                console.log('输出需要重新请求的api:' + api)
                let header = Object.assign({
                  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                  'x-access-token': wx.getStorageSync('access_token'),
                });
                console.log('header:' + header);
                that.request(method, api, data, header).then(res => {
                  console.log('重新登录后，重新请求api成功~');
                  resolve(r.data);
                }, res => {
                  console.error('重新登录后，重新请求api报错');
                  reject(res.data);
                })
              }, resLogin => {
                wx.showToast({
                  title: '用户登录失败',
                  icon: 'none',
                  duration: 3000
                })
              })


            } else {

            }


          } else if (r.statusCode == 420) {
            reject(r)
          } else {
            console.log(r)
            reject('未知错误22')
          }
        },
        fail: function (r) {
          reject(r.errMsg || '出现错误(http fail)')
          // 错误接口拦截
          // util.showBusy(r.errMsg);
        }
      })
    })
  },

  // 在app.js中判断是否是哪种设备
  globalData: {
    isIphoneX: false,
    userInfo: null
  },
  onShow: function () {
    let that = this;
    wx.getSystemInfo({
      success: res => {
        // console.log('手机信息res'+res.model)
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.globalData.isIphoneX = true
        }
      }
    })
  },

})