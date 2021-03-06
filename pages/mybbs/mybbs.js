// pages/mybbs/mybbs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bbs:null,
  },

  //点击最近帖子中的查看详情
  lookDetails: function (e) {
    //console.log(e.currentTarget.dataset.item);
    let str = JSON.stringify(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '/pages/bbs/bbs?jsonStr=' + str,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userid = options.userid;
    var that = this;
    //console.log(userid);
    //通过用户id获取用户发的帖子
    wx.request({
      url: getApp().globalData.urlhead +'/GetMyBBSs',
      data:{
        userId:userid
      },
      success:function(res){
        //console.log(res.data);
        that.setData({
          bbs:res.data
        });
      }
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
  
  }
})