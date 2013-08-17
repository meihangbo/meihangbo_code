/********************************************
@FileType   : JavaScript
@Filename   : countdown.js
@Version    : 0.0.1
@QQ         : 50980487
@Author     : meihangbo@126.com
@Update     : 2013年06月04日
@Content    : JavaScript by sublime Text 3
********************************************/
/**
 * 所有属性都带下划线;
 * 所有变量以V_开始
 */
;(function($){
	/**
	 * [fn_init 初始化]
	 * @param  {[type]} v_target [目标Dom节点]
	 */
	function fn_init(v_target){
		$(v_target).html('数据构建中...');
		var v_opts = $.data(v_target, 'adcCountdown').v_options;
		fn_readyCountdown(v_target,v_opts);
	}
	/**
	 * [fn_readyCountdown 检查参数,执行倒计时方法]
	 * @param  {[type]} v_target [目标Dom节点]
	 * @param  {[type]} v_opts   [参数对象]
	 */
	function fn_readyCountdown(v_target,v_opts){
		if(v_opts._type == null){
			if(!v_opts._startTime || !v_opts._endTime || !v_opts._nowTime){
				$(v_target).html('参数有误!');
				return false;
			}else{
				fn_defaultCountdown(v_target,v_opts);
			}
		}else{
			if(!v_opts._orderTime || !v_opts._endTime || !v_opts._nowTime || !v_opts._limitTime){
				$(v_target).html('参数有误!');
				return false;
			}else{
				fn_limitTimeCountdown(v_target,v_opts);
			}
		}
	}
	/**
	 * [fn_defaultCountdown 默认倒计时方法,并执行倒计时方法]
	 * @param  {[type]} v_target [目标Dom节点]
	 * @param  {[type]} v_opts   [参数对象]
	 */
	function fn_defaultCountdown(v_target,v_opts){
		if(v_opts._nowTime > v_opts._endTime){
			v_opts._callBack($(v_target),'over');
			return false;
		}
		if(v_opts._startTime >= v_opts._endTime){
			//$(v_target).html('参数有误,开始时间大于结束时间!');
			v_opts._callBack($(v_target),'参数有误,_startTime大于_endTime!');
			return false;
		}
		//活动未开始,显示距活动还有XXX
		if(v_opts._startTime >= v_opts._nowTime){
			var v_timediff = parseInt((v_opts._startTime - v_opts._nowTime)/100);
			fn_achieveCountdown(v_target,v_timediff);
		}
		//活动进行中
		if(v_opts._startTime <= v_opts._nowTime && v_opts._nowTime <= v_opts._endTime){
			var v_timediff = parseInt((v_opts._endTime - v_opts._nowTime)/100);
			fn_achieveCountdown(v_target,v_timediff);
		}
	}
	/**
	 * [fn_limitTimeCountdown 专门针对下单后执行时间倒计时,如果结束时间大于下单时间加指定时间,则按照指定时间加下单时间减去当前时间去倒计时;反之,结束时间减去当前时间作为倒计时]
	 * @param  {[type]} v_target [目标Dom节点]
	 * @param  {[type]} v_opts   [参数对象]
	 * @return {[type]}          [description]
	 */
	function fn_limitTimeCountdown(v_target,v_opts){
		if(v_opts._orderTime >= v_opts._endTime){
			//$(v_target).html('参数有误,下单时间大于结束时间!');
			v_opts._callBack($(v_target),'参数有误,_orderTime大于_endTime!');
			return false;
		}
		if(v_opts._orderTime > v_opts._nowTime){
			//$(v_target).html('参数有误,下单时间大于当前时间!');
			v_opts._callBack($(v_target),'参数有误,_orderTime大于_nowTime!');
			return false;
		}
		if(v_opts._nowTime > v_opts._endTime){
			//$(v_target).html('活动结束!');
			$(v_target).html('00分00.0秒');
			v_opts._callBack($(v_target),'over');
			return false;
		}else{
			if((v_opts._endTime - v_opts._orderTime) > v_opts._limitTime*1000){
				var v_timediff = parseInt((v_opts._orderTime + v_opts._limitTime*1000 - v_opts._nowTime)/100);
				fn_achieveCountdown(v_target,v_timediff,v_opts);
			}
			if((v_opts._endTime - v_opts._orderTime) <= v_opts._limitTime*1000){
				var v_timediff = parseInt((v_opts._endTime - v_opts._nowTime)/100);
				fn_achieveCountdown(v_target,v_timediff,v_opts);
			}
		}
	}
	/**
	 * [fn_achieveCountdown 此方法作用是根据参数vv_timediff作为倒计时的时间段,进行的倒计时]
	 * @param  {[type]} v_target    [目标Dom节点]
	 * @param  {[type]} vv_timediff [倒计时时间段]
	 */
	function fn_achieveCountdown(v_target,vv_timediff,v_opts){
		var vv_nTime = new Date();
		var v_str='';
		vv_timediff = vv_timediff - 1;
		var v_d = parseInt(vv_timediff/3600/24/10);
		var v_h = parseInt((vv_timediff/3600/10)%24);
		var v_m = parseInt((vv_timediff/60/10)%60);
		var v_s = parseInt(vv_timediff/10%60);
		var v_q = ((new Date()).getMilliseconds() + '').substr(0,1);
		v_d = (v_d < 10) ? ('0'+v_d) : v_d;
		v_m = (v_m < 10) ? ('0'+v_m) : v_m;
		v_h = (v_h < 10) ? ('0'+v_h) : v_h;
		v_s = (v_s < 10) ? ('0'+v_s) : v_s;
		//if(v_d != 0){
		//	v_str += '<b>' + v_d + '</b>天' + v_h + '小时' + v_m + '分钟' + v_s + '.' + v_q + "秒";
		//}else{
			/*if(v_h != 0){
				v_str += '<b>' +  v_h + '</b><em>时</em><b>' + v_m + '</b><em>分</em><b>' + v_s + '.' + v_q + "</b><em>秒</em>";
			}else{
				v_str += '<b>' +  v_m + '</b><em>分</em><b>' + v_s + '.' + v_q + "</b><em>秒</em>";
			}*/
			if('order' == v_opts._type){
				v_str += '<b>' +  v_m + '</b><em>分</em><b>' + v_s + '.' + v_q + "</b><em>秒</em>";
			}else{
				v_str += '<b>' +  v_h + '</b><em>时</em><b>' + v_m + '</b><em>分</em><b>' + v_s + "</b><em>秒</em>";
			}
		//}
		$(v_target).html(v_str);
		if(vv_timediff <= 0){
			//$(v_target).html('已结束');
			$(v_target).html('00分00.0秒');
			v_opts._callBack($(v_target),'over');
		}else{
			setTimeout(function (){
				fn_achieveCountdown(v_target,vv_timediff,v_opts);
			},100);
		}
		
	}
	/**
	 * [adcCountdown 定义倒计时插件]
	 * @param  {[type]} v_options [参数]
	 * @param  {[type]} v_param   [参数]
	 * @return {[type]}           [设置参数,并指型初始化]
	 */
	$.fn.adcCountdown = function (v_options,v_param){
		if (typeof v_options == 'string'){
			var v_method = $.fn.adcCountdown.methods[v_options];
			if (v_method){
				return v_method(this, v_param);
			}
		}
		v_options = v_options || {};
		return this.each(function(){
			var v_state = $.data(this, 'adcCountdown');
			if(v_state){
				$.extend(v_state.v_options, v_options);
			}else{
				$.data(this,'adcCountdown',{
					v_options : $.extend({},$.fn.adcCountdown.defaults,v_options)
				});
				fn_init(this);
			}
		});
	};
	/**
	 * [methods 倒计时插件方法]
	 * @type {Object}
	 */
	$.fn.adcCountdown.methods = {
		v_options: function(v_jq){
			return $.data(v_jq[0], 'adcCountdown').v_options;
		}
	};
	/**
	 * [defaults 倒计时参数对象]
	 * @type {Object}
	 */
	$.fn.adcCountdown.defaults = {
		_type:null,
		_debug:false,
		_sitTimeout:100,
		_startTime:0,
		_endTime:0,
		_nowTime:0,
		_orderTime:0,
		_limitTime:0,
		_callBack : function (){}
	};
})(jQuery);