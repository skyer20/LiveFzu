// pages/type/type.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bbs:null,
    typeTitle:null,
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
    var that = this;
    var bbsType = options.type;
    wx.request({
      url: getApp().globalData.urlhead +'/GetBBSByType',
      data:{
        bbsType:bbsType
      },
      success:function(res){
        //console.log(res);
        that.setData({
          bbs:res.data,
          typeTitle:bbsType
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