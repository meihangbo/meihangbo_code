/*!
 * Javascript
 * Copyright(c) 2006-2009
 * CreatDate: 2009-08-17
 * 公用的验证表单类
 * meihangbo@126.com
 */
Ext.apply(Ext.form.VTypes, {
	password: function(val, field) {
		if (field.initialPassField) {
			var pwd = Ext.getCmp(field.initialPassField);
			return (val == pwd.getValue());
		}
		return true;
	},
	passwordText: '两次输入的密码不一致!',
	chinese: function(val, field) {
		var reg = /^[\u4e00-\u9fa5]+$/i;
		if (!reg.test(val)) {
			return false;
		}
		return true;
	},
	chineseText: '请输入中文',
	age: function(val, field) {
		try {
			if (parseInt(val) >= 18 && parseInt(val) <= 100) return true;
			return false;
		} catch(err) {
			return false;
		}
	},
	ageText: '年龄输入有误',
	alphanum: function(val, field) {
		try {
			if (!/\W/.test(val)) return true;
			return false;
		} catch(e) {
			return false;
		}
	},
	alphanumText: '请输入英文字母或是数字,其它字符是不允许的.',
	url: function(val, field) {
		try {
			if (/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(val)) return true;
			return false;
		} catch(e) {
			return false;
		}
	},
	urlText: '请输入有效的URL地址.',
	max: function(val, field) {
		try {
			if (parseFloat(val) <= parseFloat(field.max)) return true;
			return false;
		} catch(e) {
			return false;
		}
	},
	maxText: '超过最大值',
	min: function(val, field) {
		try {
			if (parseFloat(val) >= parseFloat(field.min)) return true;
			return false;
		} catch(e) {
			return false;
		}
	},
	minText: '小于最小值',
	datecn: function(val, field) {
		try {
			var regex = /^(\d{4})-(\d{2})-(\d{2})$/;
			if (!regex.test(val)) return false;
			var d = new Date(val.replace(regex, '$1/$2/$3'));
			return (parseInt(RegExp.$2, 10) == (1 + d.getMonth())) && (parseInt(RegExp.$3, 10) == d.getDate()) && (parseInt(RegExp.$1, 10) == d.getFullYear());
		} catch(e) {
			return false;
		}
	},
	datecnText: '请使用这样的日期格式: yyyy-mm-dd. 例如:2008-06-20.',
	integer: function(val, field) {
		try {
			if (/^[-+]?[\d]+$/.test(val)) return true;
			return false;
		} catch(e) {
			return false;
		}
	},
	integerText: '请输入正确的整数',
	//校验时间
	vdouble: function(val, field) {
		try {
			if (/^[-+]?[\d]+\.?[\d]{0,15}$/.test(val)) return true;
			return false;
		} catch(e) {
			return false;
		}
	},
	vdoubleText: '请输入正确的数字',
	//首字符为空白符
	startBlank: function(val, field) {
		try {
			if (/^\S/.test(val)) return true;
			return false;
		} catch(e) {
			return false;
		}
	},
	startBlankText: '不能以空白符开始！',
//时间先后校验
dateRange: function(val, field) {
	try {
		//var form = field.findParentByType('form')||field.findParentByType('panel');
		var form = field.findParentBy(function (container,thisp){
			return typeof(container.form) != "undefined";
		})
		if(field.dateRange){
			var beginId = field.dateRange.begin;
			var endId = field.dateRange.end;
			var begin = form.find('name',beginId)[0].getValue()||-1;
			var end = form.find('name',endId)[0].getValue()||-1;
			
			if(begin==-1){/*
				var be = form.find('name',beginId)[0].fieldLabel||"开始时间";
				this.dateRangeText="您还未填写"+be+"！";
				return false;*/
				return true;
			}
			if(end==-1||end >=begin){return true;}
			this.dateRangeText = field.dateRange.msg||this.dateRangeText;
			return false;
		}
	} catch(e) {
		alert(e);
		if(field.dateRange)
			this.dateRangeText = field.dateRange.msg||this.dateRangeText;
		return false;
	}
},
dateRangeText: '开始时间不能晚于结束时间！',
//邮政编码简单校验只限制是六位
postcode:function(val, field){
	try {
			if (/^\d{6}$/.test(val)) return true;
			return false
		} catch(e) {
			return false;
		}
},
postcodeText:'邮政编码格式错误(邮政编码只能是六位数字)！',
//传真校验
fax:function(val, field){
	try {
			if (/^(0\d{1,3}-)?(\d{2,4}-)?[1-9]\d{6,7}$/.test(val)) return true;
			return false
		} catch(e) {
			return false;
		}
},
faxText:'传真格式错误(如:029-84893223,0183-029-82343787,84893223)！',
//电话校验
vphone:function(val, field){
	try {
		if (val==""||/^(0\d{1,3}-)?(\d{2,4}-)?[1-9]\d{6,7}$/.test(val) || /^1\d{10}$/.test(val)) return true;
			return false
		} catch(e) {
				alert("e="+e);
			return false;
		}
},
vphoneText:'电话号码格式错误(如:029-84893223,0183-029-82343787,84893223,13787495837)！',
//电话(座机)校验
vtelephone:function(val, field){
	try {
			if (val==""||/^(0\d{1,3}-)?(\d{2,4}-)?[1-9]\d{6,7}$/.test(val)) return true;
			return false
		} catch(e) {
			return false;
		}
},
vtelephoneText:'电话号码格式错误(如:029-84893223,0083-029-82343787,84893223)！',
//电话(手机)校验
vmobilephone:function(val, field){
	try {
			if (val==""||/^1\d{10}$/.test(val)) return true;
			return false
		} catch(e) {
			return false;
		}
},
vmobilephoneText:'手机号码格式错误(如:13787495837)！',
	minlength: function(val, field) {
		try {
			if (val.length >= parseInt(field.minlen)) return true;
			return false
		} catch(e) {
			return false;
		}
},
	minlengthText: '长度过小',
	maxlength: function(val, field) {
		try {
			if (val.length <= parseInt(field.maxlen)) return true;
			return false;
		} catch(e) {
			return false;
		}
	},
	maxlengthText: '长度过大',
	ip: function(val, field) {
		try {
			if ((/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(val))) return true;
			return false;
		} catch(e) {
			return false;
		}
	},
	ipText: '请输入正确的IP地址',
	phone: function(val, field) {
		try {
			if (/^((0[1-9]{3})?(0[12][0-9])?[-])?\d{6,8}$/.test(val)) return true;
			return false;
		} catch(e) {
			return false;
		}
	},
	phoneText: '请输入正确的电话号码,如:0920-29392929',
	mobilephone: function(val, field) {
		try {
			if (/(^0?[1][35][0-9]{9}$)/.test(val)) return true;
			return false;
		} catch(e) {
			return false;
		}
	},
	mobilephoneText: '请输入正确的手机号码',
	alpha: function(val, field) {
		try {
			if (/^[a-zA-Z]+$/.test(val)) return true;
			return false;
		} catch(e) {
			return false;
		}
	},
	alphaText: '请输入英文字母',
	mobilephoneText: '请输入正确的手机号码',
	nalpha: function(val, field) {
		try {
			if (/^[\w?\d]+$/.test(val)) return true;
			return false;
		} catch(e) {
			return false;
		}
	},
	nalphaText: '该字段只能输入英文字母或数字！',
	money: function(val, field) {
		try {
			if (/^\d+\.\d{2}$/.test(val)) return true;
			return false;
		} catch(e) {
			return false;
		}
	},
	moneyText: '请输入正确的金额',
	// 身份证
	idCard : function(_v) {
		var area = {11 : "北京",12 : "天津",13 : "河北",14 : "山西",15 : "内蒙古",21 : "辽宁",22 : "吉林",23 : "黑龙江",31 : "上海",32 : "江苏",33 : "浙江",34 : "安徽",35 : "福建",36 : "江西",37 : "山东",41 : "河南",42 : "湖北",43 : "湖南",44 : "广东",45 : "广西",46 : "海南",50 : "重庆",51 : "四川",52 : "贵州",53 : "云南",54 : "西藏",61 : "陕西",62 : "甘肃",63 : "青海",64 : "宁夏",65 : "新疆",71 : "台湾",81 : "香港",82 : "澳门",91 : "国外"};
		var Y, JYM;
		var S, M;
		var idcard_array = new Array();
		idcard_array = _v.split("");
		// 地区检验
		if (area[parseInt(_v.substr(0, 2))] == null) {
			this.idCardText = "身份证号码地区非法!!,格式例如:32";
			return false;
		}
		// 身份号码位数及格式检验
		switch (_v.length) {
			case 15 :
			 if ((parseInt(_v.substr(6, 2)) + 1900) % 4 == 0|| ((parseInt(_v.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(_v.substr(6, 2)) + 1900)% 4 == 0)) {
				// 测试出生日期的合法性
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
			} else {
				// 测试出生日期的合法性
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
			}
			if (ereg.test(_v))return true;
			else {
				this.idCardText = "身份证号码出生日期超出范围,格式例如:19860817";
				return false;
			}
			break;
			case 18 :
			 // 18位身份号码检测
			 // 出生日期的合法性检查
			 // 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
			 // 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
			 if (parseInt(_v.substr(6, 4)) % 4 == 0|| (parseInt(_v.substr(6, 4)) % 100 == 0 && parseInt(_v.substr(6, 4))% 4 == 0)) {
				 ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
				 // 闰年出生日期的合法性正则表达式
			} else {
				// 平年出生日期的合法性正则表达式
				ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
			}
			if (ereg.test(_v)) {
				// 测试出生日期的合法性
				// 计算校验位
				S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10]))* 7+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))* 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))* 10+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))* 5+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))* 8+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))* 4+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))* 2+ parseInt(idcard_array[7])* 1+ parseInt(idcard_array[8])* 6+ parseInt(idcard_array[9]) * 3;
				Y = S % 11;
				M = "F";
				JYM = "10X98765432";
				M = JYM.substr(Y, 1);// 判断校验位
				// alert(idcard_array[17]);
				if (M == idcard_array[17]) {
					return true; // 检测ID的校验位
				} else {
					this.idCardText = "身份证号码末位校验位校验出错,请注意x的大小写,格式例如:201X";
					return false;
				}
			} else {
				this.idCardText = "身份证号码出生日期超出范围,格式例如:19860817";
				return false;
			}
			break;
			default :this.idCardText = "身份证号码位数不对,应该为15位或是18位";
			return false;
			break;
		}
	},
	idCardText : "该输入项目必须是身份证号码格式，例如：32082919860817201x",
	idCardMask : /[0-9xX]/i
});
