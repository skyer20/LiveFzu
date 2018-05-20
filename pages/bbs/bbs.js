// pages/bbs/bbs.js
Page({

  /**
   * 页面的初始数据
   * collectFlag:  -1 表示没被收藏 1表示被收藏
   */
  data: {
    userInfo:null,
    newcomment:"",
    comments:null,
    hiddenmodalput: true,
    collectFlag: -1,
    bbs: null,
    collectionIcon: "../../img/bbs/collection.png"
  },

  //点击评论
  clickComment:function(e){
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    }) 
  },
  //评论中的输入框
  getComment:function(e){
    this.setData({
      newcomment: "",
      newcomment:e.detail.value
    });
  },
  //点击评论中的发表
  confirm:function(){
    var that = this;
    //console.log(this.data.newcomment);
    wx.request({
      url: getApp().globalData.urlhead +'/AddCommnet',
      data:{
        userId: that.data.userInfo.id,
        teiziId: that.data.bbs.id,
        content:that.data.newcomment
      },
      method:"POST",
      success:function(res){
        console.log(res)
      }
    })
    //重新加载评论
    wx.request({
      url: getApp().globalData.urlhead +'/GetCommentByTieziId',
      data: {
        tieziId: that.data.bbs.id
      },
      success: function (res) {
        //console.log(res);
        that.setData({
          comments: res.data
        });
      }
    })

    this.setData({
      newcomment: "",
      hiddenmodalput: true
    });  
  },
  //点击评论中的取消
  cancel:function(){
    this.setData({
      hiddenmodalput: true
    });  
  },

  //点击收藏
  clickCollect: function (e) {
    var that = this;
    if (this.data.collectFlag == -1) { //原来是未收藏状态 点击触发收藏
      wx.request({
        url: getApp().globalData.urlhead +'/AddCollection',
        method: "POST",
        data: {
          userId: that.data.userInfo.id,
          tieziId: that.data.bbs.id
        },
        success: function (res) {
          that.setData({
            collectFlag: 1,
            collectionIcon: "../../img/bbs/collectionSelected.png"
          });
          //console.log(res);

          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })

        }
      })
    } else {  //原来是收藏状态 点击触发取消收藏
      wx.request({
        url: getApp().globalData.urlhead +'/DeleteCollection',
        data: {
          userId: that.data.userInfo.id,
          tieziId: that.data.bbs.id
        },
        success: function (res) {
          that.setData({
            collectFlag: -1,
            collectionIcon: "../../img/bbs/collection.png"
          });
          wx.showToast({
            title: '取消收藏成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
    this.setData({
      collectFlag: this.data.collectFlag * (-1)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let tiezi = JSON.parse(options.jsonStr);
    this.setData({
      bbs: tiezi
    });
    var user = getApp().globalData.userInfo;
    this.setData({
      userInfo:user
    });

    //console.log(this.data.bbs);
    //获取收藏状态
    wx.request({
      url: getApp().globalData.urlhead +'/HavaCollection',
      data: {
        userId: that.data.bbs.user_id,
        tieziId: that.data.bbs.id
      },
      success: function (res) {
        //console.log(res);
        if (res.data == true) { //已经收藏过
          that.setData({
            collectFlag: 1,
            collectionIcon: "../../img/bbs/collectionSelected.png"
          });
        } else { //还未收藏
          that.setData({
            collectFlag: -1,
            collectionIcon: "../../img/bbs/collection.png"
          });
        }

        //获取收藏状态后，获取该帖子的评论
        wx.request({
          url: getApp().globalData.urlhead +'/GetCommentByTieziId',
          data:{
            tieziId: that.data.bbs.id
          },
          success:function(res){
            console.log(res);
            that.setData({
              comments:res.data
            });
          }
        })
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