Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:"",
    password:"",
    tel:"",
    qq:"",
    wxname:null,
    wxtxaddress:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getAccount: function (e) {
    this.setData({
      account: e.detail.value
    });
  },
  getPassword: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  getTel:function(e){
    this.setData({
      tel:e.detail.value
    });
  },
  getQQ:function(e){
    this.setData({
      qq:e.detail.value
    });
  },
  sure: function () {
    var that=this;
    //注意这是一个线程。如果不把给服务器请求放在成功回调方法之后，可能出现线程问题
    wx.getUserInfo({
      success: function (res) {
        that.data.wxname=res.userInfo.nickName;
        that.data.wxtxaddress=res.userInfo.avatarUrl;
        //console.log(that.data);
        wx.request({
          url: getApp().globalData.urlhead +'/Register',
          method: "POST",
          data: {
            account: that.data.account,
            password: that.data.password,
            tel: that.data.tel,
            qq: that.data.qq,
            wxname: that.data.wxname,
            wxtxaddress: that.data.wxtxaddress
          },
          success: function (res) {
            //console.log(res.data);
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },
  cancel: function () {
    wx.navigateBack({
      delta:1
    })
  }
})