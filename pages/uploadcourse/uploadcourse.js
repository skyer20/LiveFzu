// pages/uploadcourse/uploadcourse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course:null,
    files:null,
  },
  //点击下载
  // uploadFile:function(e){
  //   console.log(e.currentTarget.dataset.item);
  //   wx.request({
  //     url: getApp().globalData.urlhead +'/DownloadFile',
  //     data:{
  //       fileId: e.currentTarget.dataset.item.id
  //     },
  //     success:function(){
        
  //     }
  //   })
  //},
  uploadFile:function(e){
    wx.downloadFile({
      url: getApp().globalData.urlhead + '/DownloadFile/' + e.currentTarget.dataset.item.id,
      success:function(res){
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let Course = JSON.parse(options.jsonStr)
    console.log(Course);
    that.setData({
      course:Course
    });
    wx.request({
      url: getApp().globalData.urlhead +'/GetFileByPath',
      data:{
        path:Course.path
      },
      success:function(res){
        console.log(res.data);
        that.setData({
          files:res.data
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