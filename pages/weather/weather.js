// pages/weather/weather.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weatherData:null,
  },

  //点击按钮获取最近三天天气情况
  recentWeather:function(e){
    //console.log(this);
    let weatherData = JSON.stringify(this.data.weatherData.originalData.results[0].weather_data);
    wx.navigateTo({
      url: '/pages/recentweather/recentweather?jsonStr='+weatherData,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let weather = JSON.parse(options.jsonStr);
    this.setData({
      weatherData:weather
    });
    //console.log(weather);
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