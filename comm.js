/**************************
@FileType		:	JavaScript
@Filename		:	filename.js
@Version		:	0.0.1
@QQ			:	50980487
@Author		:	meihangbo@126.com
@Update		:	2010年6月26日
@Content		: 	JavaScript by Editplus
**************************/
//获取浏览器可见宽度和高度
function getPagebodySize() {
	var winWidth = 0;
	var winHeight = 0;
	var docBody= document.body;
	var docEl = document.documentElement;
	//获取窗口宽度
	if (window.innerWidth){
		winWidth = window.innerWidth;
	}else if ((docBody) && (docBody.clientWidth)){
		winWidth = docBody.clientWidth;
	}
	//获取窗口高度
	if (window.innerHeight){
		winHeight = window.innerHeight;
	}else if ((docBody) && (docBody.clientHeight)){
		winHeight = docBody.clientHeight;
	}
	//通过深入Document内部对body进行检测，获取窗口大小
	if (docEl && docEl.clientHeight && docEl.clientWidth){
		winHeight = docEl.clientHeight;
		winWidth = docEl.clientWidth;
	}
	var arrayPageSize = {"winWidth":winWidth,"winHeight":winHeight};
	return arrayPageSize;
}
//设置主页面可见内容大小
function setPageSize() {
	var wh = getPagebodySize();
	$(document.body).width(wh.winWidth);
	$(document.body).height(wh.winHeight);
	$("iframe[name='win']").width(wh.winWidth);
	$("iframe[name='win']").height(wh.winHeight);
}
function url(s){
	if(s.indexOf('?')>-1){
		str = ctx+s.substring(0,s.indexOf('?'))+'.html';
		str = str + s.substring(s.indexOf('?'),s.length);
		return str;
	}else{
		return ctx+s+'.html';
	}

}
//弹出提示信息框
function msgWin(_title,_width,_height) {
	var _w = _width || 300;
	var _h = _height || 100;
	var win = new J.ui.dialog({
		title:'温馨提示',
		cover:true,
		rang: true,
		resize:false,
		btns:false,
		width:_w,
		height: _h, 
		html: _title
	});
	win.ShowDialog();
}

var stackBottomright = {"dir1": "up", "dir2": "left", "firstpos1": 15, "firstpos2": 15};
function showMsg(_text,_type){
	var opts = {
		pnotify_title:'',
		pnotify_text: _text,
		pnotify_type:_type||'',
		pnotify_addclass: 'stack-bottomright',
		pnotify_stack:stackBottomright,
		pnotify_delay: 8000,
		pnotify_hide: true,
		pnotify_mouse_reset: false
	};
	$.pnotify(opts);
}

function evalJson(str){
	return eval('('+str+')');
}
//删除字符串中指定的字符串
function removestr(str,delStr){
	if(!str){return "";}
	return (","+str+",").replace(","+delStr+",",",").replace(",,",",").replace(/(?:^,)|(?:,$)/g,"");
}
//获取字符串(以,分隔)的长度
function strObjLen(str){
	var len = 0;
	if(str.length>0){
		if(str.indexOf(',')==-1){len = 1;
		}else{len = str.split(',').length;}
	}
	return len;
}
//删除字符串中相同的部分.
function delStrSame(str){
	str = str.replace(/,/g,",,");
	while(str.match(/(,[^,]+,)(.*)\1(.*)/g)){str = str.replace(/(,[^,]+,)(.*)\1(.*)/g,"$1$2$3");}
	return str.replace(/,{2,}/g,",").replace(/(?:^,)|(?:,$)/g,"");
}
//验证起始时间&截止时间
function checkTime(){
	var sTime = document.getElementById("startTime").value;
	var eTime = document.getElementById("endTime").value;
	sTime = sTime.replace(/-/g,"");//  /str/g全局标识
	eTime = eTime.replace(/-/g,"");
	return sTime*1==0||eTime*1==0||eTime*1>=sTime*1;
}