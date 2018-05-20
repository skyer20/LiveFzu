let bmap = require('../../libs/bmap-wx.js');
let tools = require('../../utils/tools.js');
let utils = require('./util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    style: '',
    show: 'hide',
    mapIconSrc: '../../img/weather/location.png',
    todyWeather: '', //今天天气
    futureThreeDay: [], //未来三天
    variousIndex: [], //各项指数
    region: ['福建省', '福州市', '闽侯县'],
    city:"福州市"
  },
  //选择不同城市，获取该城市的天气情况
  bindRegionChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      region:e.detail.value
    });
    let _ = this;
    tools.loading('加载中...');
    //对选择的城市进行地理编码，获取该城市的经纬度信息
    wx.request({
      url: 'http://api.map.baidu.com/geocoder/v2/?address=' + _.data.region[0] + _.data.region[1] + _.data.region[2] +'&output=json&ak=h1kRgDMZnDZQWMDugHwftveaGDwWcm5W',
      success:function(res){
        //console.log(res);
        var location = res.data.result.location.lng + ","+res.data.result.location.lat;
        //console.log(location);
        //准备对百度地图api的请求
        let BMap = new bmap.BMapWX({
          ak: 'h1kRgDMZnDZQWMDugHwftveaGDwWcm5W'
        });
        let fail = function (data) {
          tools.loadingEnd();
          tools.errorDialog('数据获取失败，重新加载', query);
        };
        let success = function (data) {
          //处理数据，返回自定义格式数据
          let _tody = _.dealTodayData(data.currentWeather[0]);
          let _future = _.dealFuture(data.originalData.results[0].weather_data);
          let _index = _.dealIndex(data.originalData.results[0].index);
          //console.log(data);
          //console.log(data.originalData.results[0].index);
          _.setData({
            show: 'show',
            todyWeather: _._addItemData(_tody),
            futureThreeDay: _future,
            variousIndex: _index
          });
          //console.log(_.data);
          tools.loadingEnd();
        }
        let query = function () {
          // 发起weather请求 
          BMap.weather({
            location:location,
            fail: fail,
            success: success
          });
        }
        query(); 
      }
    })


    this.setData({
      city: e.detail.value[1]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let _ = this;
    tools.loading('加载中...');
    let BMap = new bmap.BMapWX({
      ak: 'h1kRgDMZnDZQWMDugHwftveaGDwWcm5W'
    });
    let fail = function (data) {
      tools.loadingEnd();
      tools.errorDialog('数据获取失败，重新加载', query);
    };
    let success = function (data) {
      //处理数据，返回自定义格式数据
      let _tody = _.dealTodayData(data.currentWeather[0]);
      let _future = _.dealFuture(data.originalData.results[0].weather_data);
      let _index = _.dealIndex(data.originalData.results[0].index);
      //console.log(data);
      //console.log(data.originalData.results[0].index);
      _.setData({
        show: 'show',
        todyWeather: _._addItemData(_tody),
        futureThreeDay: _future,
        variousIndex: _index
      });
      tools.loadingEnd();
    }
    let query = function () {
      // 发起weather请求 
      BMap.weather({
        fail: fail,
        success: success
      });
    }
    query();  
  },

  dealTodayData: function (data) {
    let _date = data.date.split('(')[0];
    let _now = parseInt(data.date.split('：')[1].replace(/[\(-\)]/g, '')) + '°';
    let _result = {
      city: data.currentCity,
      pm25: data.pm25,
      date: _date,
      realtimeTemperature: _now,
      temperature: utils.dealTemperature(data.temperature),
      weather: data.weatherDesc,
      wind: data.wind,
      iconSrc: utils.weatherLevel(data.weatherDesc),
    };
    return _result;
  },
  dealFuture: function (data) {
    let _ = this;
    let _result = [];
    for (let i = 1; i < data.length; i++) {
      let _item = {
        weather: data[i].weather,
        date: data[i].date,
        temperature: utils.dealTemperature(data[i].temperature),
        iconSrc: utils.weatherMoreLevel(data[i].weather)
      };
      _result.push(_item);
    }
    return _result;
  },
  dealIndex: (data) => {
    let _result = [];
    for (let i = 1; i < data.length; i++) {
      let _item = {
        title: data[i].title,
        value: data[i].zs,
        desc: data[i].des
      };
      _result.push(_item);
    }
    return _result;
  },
  // 返回背景颜色，并设置背景色
  _addItemData: function (item) {
    item.style = utils.returnStyle(item.weather);
    return item;
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