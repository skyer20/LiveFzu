// pages/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 2,
    searchArray: ['学院', '专业', '课程名', '任课老师'],
    searchContent: null,
    courseType:null,
  },
  //点击选中根据什么类型进行搜索
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    });
  },
  //搜索内容输入结束
  searchConfirm: function (e) {
    this.setData({
      searchContent: e.detail.value
    });
    var that = this;
    //console.log(e);
  },
  //点击某一个条目
  detail:function(e){
    //console.log(e.currentTarget.dataset.item);
    let str = JSON.stringify(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '/pages/uploadcourse/uploadcourse?jsonStr=' + str,
    })
  },

  //点击我要上传文件
  uploadCourse:function(e){
    //console.log(e);
    // wx.navigateTo({
    //   url: '/pages/uploadView/uploadView',
    // })
    wx.showModal({
      title: '上传课件',
      content: '十分抱歉！由于微信小程序尚未开发相关接口，请通过浏览器访问http://localhost:8080/FzuLive/upload.html上传课件',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取上传课件的类型
    wx.request({
      url: getApp().globalData.urlhead +'/GetCourseType',
      success: function (res) {
        console.log(res);
        //console.log(that)
        that.setData({
          courseType:res.data
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