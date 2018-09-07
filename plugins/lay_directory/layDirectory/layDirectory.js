/*
* @Author: meihangbo
* @Date:   2018-09-05 09:49:32
* @Last Modified by:   meihangbo
* @Last Modified time: 2018-09-07 11:27:32
*/

layui.define('jquery', function (exports){
  "use strict";
  var $ = layui.jquery,

  // 外部接口
  layDir = {
    config: {}, //外部接口
    //设置全局项
    set: function (opts){
      console.log('设置全局项 set' + opts);
    },
    //事件监听
    on : function (events, callback){
      console.log('事件监听 on' + opts);
    }
  },

  // 实例
  thisLayDir = function (){
    var that = this, opts = that.config;
    return {config: opts};
  },

  // 构造
  LAYDIR = function (opts){
    var that = this;
    that.config = $.extend(true, that.config, layDir.config, opts);
    console.log('LAYDIR 构造..');
    console.log(that.config);
    that.render();
  };

  //默认配置
  LAYDIR.prototype.config = {
    affix: true,
    offsetTop: 0,
    offsetBottom: 0,
    scrollOffset: 0,
    scrollContainer: '',
    skin: ''
  };
  // 获取位置数组
  LAYDIR.prototype.getPosArr = function (){};
  // 渲染
  LAYDIR.prototype.render = function (){
    console.log('LAYDIR.prototype.render');

    var that = this, opts = that.config;
    console.log(that);
    console.log(opts);



  };

  // 点击 目录项 事件
  LAYDIR.prototype.dirClick = function (){

  };




  layDir.render = function (opts){
    console.log(opts);
    return thisLayDir.call(new LAYDIR(opts));
  };

  exports('layDirectory', layDir);
}).link('layDirectory/layDirectory.css');