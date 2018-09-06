/*
* @Author: meihangbo
* @Date:   2018-09-05 09:49:32
* @Last Modified by:   meihangbo
* @Last Modified time: 2018-09-06 15:50:07
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
  Class.prototype.getPosArr = function (){
    var arr = []
    $('[lay-dir-filter="directory"]').each(function (){
      arr.push($(this).offset().top);
    });
     return arr;
  };
  Class.prototype.render = function(){
    var that = this , opts = that.config,
      othis = $(opts.elem),
      item = othis.find(ITEM),
      _links = othis.find(ILINK),
      posArr = that.getPosArr();

    _links.on('click', function (){
      var _that = $(this);
      item.removeClass(ACTIVE);
      _that.parent().addClass(ACTIVE);

      var _dirEL = $('[lay-dir-filter="directory"][title="'+_that.text()+'"]'),
      _offset = _dirEL.offset();
      _offset&&$('html,body').animate({ scrollTop: _offset.top }, 500);
    });

    //

    //监听window scroll
    $(window).on('scroll', function (){
      var $this = $(this), _tpos = $this.scrollTop();

      for(var i in posArr){
        //if(_tpos + $(window).width()/ 375 * 50 *1 >= posArr[i]){
        if(_tpos >= posArr[i]){
          othis.find('.lay-ditem').eq(i).addClass(ACTIVE).siblings().removeClass(ACTIVE);
        }
      }
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