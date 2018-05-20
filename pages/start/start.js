// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:"",
    password:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  getAccount:function(e){
    this.setData({
      account:e.detail.value
    });
    //console.log("the value is:"+this.data.account);
    //console.log(e);
  },
  getPassword:function(e){
    this.setData({
      password:e.detail.value
    });
  },
  load:function(){
    wx.request({
      url: getApp().globalData.urlhead +'/Load/'+this.data.account+'&'+this.data.password,
      success: function (res) {
        //console.log(res);
        //console.log(res.data);
        if(res.statusCode=='200'){
           var userInfo=getApp().globalData.userInfo;
           userInfo.id=res.data.id;
           userInfo.account = res.data.account;
           userInfo.password = res.data.password;
           userInfo.tel = res.data.tel;
           userInfo.qq = res.data.qq;
           userInfo.wxname = res.data.wxname;
           userInfo.wxtxaddress = res.data.wxtxaddress;
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }
    })
  },
  register:function(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  }
})