// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggest:"",
    hiddenmodalput: true,
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var u = getApp().globalData.userInfo;
    this.setData({
      userInfo:u
    });
    //console.log("name:"+this.data.wxname);
  },
  //点击我发布的帖子
  clickmybbs:function(){
    //console.log(this.data.userInfo);
    wx.navigateTo({
      url: '/pages/mybbs/mybbs?userid='+this.data.userInfo.id,
    })
  },
  //点击我的收藏
  clickCollection:function(){
    //console.log("collection");
    wx.navigateTo({
      url: '/pages/mycollection/mycollection?userid='+this.data.userInfo.id,
    })
  },
  //点击联系客服 触发打电话 待实现在线客服
  callService:function(){
    wx.makePhoneCall({
      phoneNumber: '12345678900', //此号码并非真实电话号码，仅用于测试  
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  //点击投诉与建议
  clickSuggest:function(){
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //评论中的输入框
  getComment: function (e) {
    this.setData({
      suggest: e.detail.value
    });
    //console.log(this.data.suggest);
  },
  //点击评论中的取消
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      suggest: "",
    });
  },
  //点击评论中的确定
  confirm: function () {
    var that = this;
    //console.log("confirm");
    wx.request({
      url: getApp().globalData.urlhead +'/AddSuggest',
      method: "POST",
      data: {
        userId: that.data.userInfo.id,
        content: that.data.suggest
      },
      success:function(res){
        console.log(res);
        that.setData({
          hiddenmodalput: true,
          suggest: "",
        });
      }
    })
  },
})