//应用百度地图微信小程序模块
var bmap = require('../../libs/bmap-wx.js');
Page({

  /**
   * 页面的初始数据
   */   
  data: {
    index:0,
    searchArray: ['微信名', '帖子内容', '联系人', 'QQ', '手机号'],
    searchContent:null,
    weather:null,
    recentTiezi:null,
    imgUrls: [
      '../../img/index/picture/Fzu00.jpg',
      '../../img/index/picture/Fzu01.jpg',
      '../../img/index/picture/Fzu02.jpg',
      '../../img/index/picture/Fzu03.jpg',
      '../../img/index/picture/Fzu04.jpg',
      '../../img/index/picture/Fzu05.jpg'
    ],
    iconList:[{
      name:"二手物品",
      src: "../../img/index/icon/Ershou.png"
    }, {
      name: "兼职家教",
      src: "../../img/index/icon/Jianzhi.png"
      }, {
        name: "失物招领",
        src: "../../img/index/icon/Shiwu.png"
    }, {
      name: "学院信息",
      src: "../../img/index/icon/Xueyuan.png"
      }, {
        name: "就业信息",
        src: "../../img/index/icon/Jiuye.png"
    }, {
        name: "拼车",
        src: "../../img/index/icon/Pinche.png"
    },{
      name:"天气查询",
      src:"../../img/index/icon/weather.png"
    },{
      name:"课件分享",
      src: "../../img/index/icon/courseware.png"
    },{
      name:"周边查询",
      src:"../../img/index/icon/periphery.png"
    }]
  },
  //点击选中根据什么类型进行搜索
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    });
  },
  //搜索内容输入结束
  searchConfirm:function(e){
    this.setData({
      searchContent: e.detail.value
    });
    var that = this;
    //console.log(e);
    wx.navigateTo({
      url: '/pages/search/search?searchType=' + that.data.searchArray[that.data.index] + "&searchContent=" + that.data.searchContent,
    })
  },
  //点击分类查看帖子
  lookByType:function(e){
    //console.log(e.currentTarget.dataset.name);
    var name = e.currentTarget.dataset.name;
    if(name=="天气查询"){
      wx.navigateTo({
        url: '/pages/weatherquery/weatherquery',
      })
    }else{
      wx.navigateTo({
        url: '/pages/type/type?type=' + e.currentTarget.dataset.name,
      })
    }
  },

  //点击最近帖子中的查看详情
  lookDetails:function(e){
    //console.log(e.currentTarget.dataset.item);
    let str = JSON.stringify(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '/pages/bbs/bbs?jsonStr='+str,
    })
  },

  //点击跳转天气页面详情
  gotoWeather:function(e){
    let weather = JSON.stringify(this.data.weather);
    wx.navigateTo({
      url: '/pages/weather/weather?jsonStr='+weather,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //根据百度地图ak获取百度地图对象
    var bmapAK = getApp().globalData.bmapAK;
    var BMap = new bmap.BMapWX({
      ak:bmapAK
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (res) {
      //console.log(res)
      that.setData({
        weather:res
      });
    };
    //获取用户所在位置
    wx.getLocation({
      success: function(res) {
        //console.log(res);
        var location = res.longitude + "," + res.latitude;
        // 发起weather请求 
        BMap.weather({
          location:location,
          fail: fail,
          success: success
        }); 
      },
    })
    
    
      
    //获取最近发帖信息
    wx.request({
      url: getApp().globalData.urlhead+'/GetRecentTiezi',
      data: {
        page: 0,
        size: 5
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          recentTiezi: res.data
        })
        //console.log(that)
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