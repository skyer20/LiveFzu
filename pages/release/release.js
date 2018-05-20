// pages/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    textContent:'',
    releasetype:'二手物品',
    name:'',
    tel: '',
    qq: '',
    position: '',
    time: '',
    imgUrl:[{
      src: '../../img/release/addPicture.png',
      clickmethod:'getPicture'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = getApp().globalData.userInfo;
    //console.log(this.data.name);
    this.setData({
      userId:userInfo.id,
      name:userInfo.wxname,
      tel: userInfo.tel,
      qq: userInfo.qq
    });
  },

  /**
   * 发布帖子按钮
   */
  release:function(e){
    //console.log(this.data.imgUrl.length);
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        wx.request({
          url: getApp().globalData.urlhead +'/Release',
          method: "POST",
          data: {
            userId:that.data.userId,
            textContent: that.data.textContent,
            releasetype: that.data.releasetype,
            tel: that.data.tel,
            qq: that.data.qq,
            name: that.data.name,
            position: that.data.position,
            time: that.data.time
          },
          success: function (res) {
            //console.log(res.data);
            //console.log(that.data);
            var len = that.data.imgUrl.length;
            for(var i=1;i<len;i++){
              //上传图片
              wx.uploadFile({
                url: getApp().globalData.urlhead +'/UploadPicture',
                filePath: that.data.imgUrl[i].src,
                name: 'pictureFile',
                formData:{
                  "id":res.data.id
                },
                success: function (res) {
                  //console.log(res);
                  //将页面数据还原初始化并跳转
                  that.setData({
                    textContent: '',
                    releasetype: '二手物品',
                    position: '',
                    time: '',
                    imgUrl: [{
                      src: '../../img/release/addPicture.png',
                      clickmethod: 'getPicture'
                    }]
                  });
                  wx.switchTab({
                    url: '/pages/index/index',
                    success:function(e){
                      var page = getCurrentPages().pop();
                      if (page == undefined || page == null) return;
                      page.onLoad(); 
                    }
                  })
                }
              })

            }
          }
        })
      }
    })
  },

  // /**
  //  * 获取图片
  //  */
  getPicture:function(){
    var that =this;
    //console.log('you hava click add button');
   wx.chooseImage({
     success: function(res) {
       //console.log(res.tempFilePaths);
       var urls = that.data.imgUrl;
       var paths = res.tempFilePaths;
       var string;
       for(var i=0;i<paths.length;i++){
         //要用setData才能立即渲染加载获取到的图片
         //that.data.imgUrl.push({src:paths[i],clickmethod:'clickPicture'});
         //that.setData({ imgUrl: [{src: paths[i], clickmethod: 'clickPicture'}]});
         urls = that.data.imgUrl;
         urls.push({src: paths[i], clickmethod: 'clickPicture'});
         //console.log(urls);
         that.setData(that.data);
       }
       //console.log(that.data.imgUrl);
     },
   }) 
  },
  /**
   * 获取发布帖子的各种信息
   */
  getContext:function(e){
    this.setData({
      textContent:e.detail.value
    });
  },
  getType: function (e) {
    this.setData({
      releasetype: e.detail.value
    });
  },
  getName: function (e) {
    this.setData({
      name: e.detail.value
    });
  },
  getTel: function (e) {
    this.setData({
      tel: e.detail.value
    });
  },
  getQQ: function (e) {
    this.setData({
      qq: e.detail.value
    });
  },
  getPosition: function (e) {
    this.setData({
      position: e.detail.value
    });
  },
  getTime: function (e) {
    this.setData({
      time: e.detail.value
    });
  },
})