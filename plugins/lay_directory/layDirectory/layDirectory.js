/*
* @Author: meihangbo
* @Date:   2018-09-05 09:49:32
* @Last Modified by:   meihangbo
* @Last Modified time: 2018-09-05 16:33:22
*/

layui.define(['jquery'], function (exports){
  "use strict";
  var $ = layui.jquery,
  // default
  layDir = {
    v: '0.0.1',
    config: {} //全局配置项
    //设置全局项
    ,set: function(options){
      var that = this;
      that.config = $.extend({}, that.config, options);
      return that;
    }
    //事件监听
    ,on: function(events, callback){
      return layui.onevent.call(this, MOD_NAME, events, callback);
    }
  },

  thisLayDir = function (){
    var that = this , opts = that.config;
    return {config: opts};
  },

  MOD_NAME = 'layDirectory',
  ITEM = '.lay-ditem',
  ILINK = '.lay-ditem-link',
  ACTIVE = 'lay-ditem-active'

  // 构造
  ,Class = function (opts){
    var that = this;
    that.config = $.extend(true, that.config, layDir.config, opts);
    that.render();
  };

  //默认配置
  Class.prototype.config = {

  };
  Class.prototype.render = function(){
    var that = this , opts = that.config,
      othis = $(opts.elem),
      item = othis.find(ITEM),
      _links = othis.find(ILINK);

    _links.on('click', function (){
      var _that = $(this);
      item.removeClass(ACTIVE);
      _that.parent().addClass(ACTIVE);

      var _dirEL = $('[lay-dir-filter="directory"][title="'+_that.text()+'"]'),
      _offset = _dirEL.offset();
      _offset&&$('html,body').animate({ scrollTop: _offset.top }, 500);
      //$('html,body').animate({ scrollTop: (_dirEL.offset()).top }, 500);
    });
  };
  //事件处理
  Class.prototype.events = function (){
    var that = this , opts = that.config;

    console.log(that);
  };


  // 入口
  layDir.render = function (opts){
    var inst = new Class(opts);
    return thisLayDir.call(inst);
  };

  exports('layDirectory', layDir);
}).link('layDirectory/layDirectory.css');