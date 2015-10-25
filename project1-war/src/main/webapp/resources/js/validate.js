/*
validate="xxxx"  表示该项需要验证
rel-required="true"  表示该项目 必须填写
checkPath="url"  表示该项需要服务端验证
groupvalidate="radio@sex"   组合验证  如表单项目 等
Time:2013-12-03
Author:WangJingLiang
*/
;
(function($, ECar) {
	if (!$) return;
	var ECar = ECar || {};
	ECar.validate = {};
	var globalPara;

	//邮箱验证
	ECar.validate.email = function(element) {
		var email = /^[0-9a-zA-Z][_.0-9A-Za-z-]{0,31}@([0-9A-Za-z][0-9A-Za-z-]{0,30}\.){1,4}[A-Za-z]{2,4}$/;
		return $.trim(element.val()).match(email);
	}
	//电话验证
	ECar.validate.phone = function(element) {
		var phone = /^1[3,4,5,7,8]\d{9}/;
		return $.trim(element.val()).match(phone);
	}
	//qq号码验证
	ECar.validate.qq = function(element) {
		var reg = /^[0-9]{1,}$/;
		return $.trim(element.val()).match(reg);
	}

	//密码验证
	ECar.validate.oldpassword = function(element) {
		var password = /^.{6,20}$/;
		var form = element.parents('form').attr('id');
		ECar.validate[form + 'password'] = element.val();
		return $.trim(element.val()).match(password);
	}

	//密码验证
	ECar.validate.password = function(element) {
		var password = /^.{6,20}$/;
		var form = element.parents('form').attr('id');
		ECar.validate[form + 'password'] = element.val();
		var k = element.parents('form').find('[validate="repassword"]').size();
		if (k != 0) {
			if (ECar.validate[form + 'repassword'] && (ECar.validate[form + 'password'] != ECar.validate[form + 'repassword'])) {
				ECar.validate.validRepassword(form);
			}
			if (ECar.validate[form + 'password'] == ECar.validate[form + 'repassword']) {
				ECar.validate.validRepassword(form);
			}
		}
		return $.trim(element.val()).match(password);
	}
	//密码确认
	ECar.validate.repassword = function(element) {
		var form = element.parents('form').attr('id');
		ECar.validate[form + 'repassword'] = element.val();
		if (ECar.validate[form + 'password'] == ECar.validate[form + 'repassword']) {
			return true;
		} else return false;
	}

	//邮政编码验证
	ECar.validate.postalcode = function(element) {
		var pcode = /^[1-9][0-9]{5}$/;
		return $.trim(element.val().match(pcode));
	}

	//验证码验证
	ECar.validate.yzm = function(element) {
		var yzm = /^.*$/;
		return $.trim(element.val()).match(yzm);
	}
	//用户名验证
	ECar.validate.username = function(element) {
		var username = /^[a-zA-Z0-9]{6,20}$/;
		return $.trim(element.val()).match(username);
	}
	//汉字+英文
	ECar.validate.realname = function(element) {
		var username = /^[A-Za-z\u4E00-\u9FA5]{1,30}$/;
		return $.trim(element.val()).match(username);
	}

	ECar.validate.cardnum = function(element) {
		var cardnum = /^.*$/;
		return $.trim(element.val()).match(cardnum);
	}
	//是否是身份证号码
	ECar.validate.cardId = function(element) {
		return isIdCardNo($.trim(element.val()));
	}

	//是否是地址
	ECar.validate.address = function(element) {
		var address = /^[a-zA-Z\d\u4e00-\u9fa5]+$/;
		return $.trim(element.val()).match(address);
	}

	//呢称
	ECar.validate.nickname = function(element) {
		var nickname = /^[A-Za-z\u4E00-\u9FA5]+$/;
		return $.trim(element.val()).match(nickname);
	}

	ECar.validate.noNull = function(element) {
		return isIdCardNo(element.val());

	}

	ECar.validate.istel = function(element) { //是否是电话号码 包括区号  传真
		var istel = /^[\d\+\-\(\)]*$/;
		return $.trim(element.val()).match(istel);
	};

	ECar.validate.config = {
		'email': {
			'empty': '请输入邮箱账号',
			'err': '您输入的邮箱有误',
			'remoteerr': '您输入的邮箱已存在'
		},
		'phone': {
			'empty': '请输入手机号码',
			'err': '您输入的手机号码格式有误',
			'remoteerr': '您输入的手机号码已存在'
		},
		'oldpassword': {
			'empty': '请输入您的旧密码',
			'err': '密码格式不正确'
		},
		'password': {
			'empty': '请输入您的密码',
			'err': '密码格式不正确'
		},
		'repassword': {
			'empty': '请再次输入您的密码',
			'err': '两次密码不一致'
		},
		'yzm': {
			'empty': '请输入验证码',
			'err': '验证码有误',
			'remoteerr': '已经失效'
		},
		'username': {
			'empty': '请输入您的用户名',
			'err': '用户名格式有误'
		},
		'account':{
			
		},
		'realname': { //nickname
			'empty': '请输入您的真实姓名',
			'err': '姓名格式有误'
		},
		'nickname': {
			'empty': '请输入您的昵称',
			'err': '昵称格式有误'
		},
		'address': {
			'empty': '请输入您的地址',
			'err': '地址格式有误'
		},
		'cardnum': {
			'empty': '请输入证件号码',
			'err': '证件号码格式有误'
		},
		'postalcode': {
			'empty': '请输入邮政编码',
			'err': '邮政编码有误'
		},

		'sex': {
			'empty': '请选择性别'
		},
		'istel': {
			'empty': '传真号码不能为空',
			'err': '传真号码格式有误'
		},
		'qq': {
			'empty': '请选择',
			'err': 'qq格式不正确'
		},
		'read': {
			'empty': '请阅读注册协议并勾选'
		},
		'cardId': {
			'empty': '请选择证件类型',
			'err': '证件号码格式有误'
		},
		'yearold': {
			'empty': '请选择生日'
		}

	}


	ECar.validate.message = function(formId, obj, validate_type, errtype, tagtype) {
		var that = $('#' + formId + ' input[validate="' + validate_type + '"]');
		var txt = $('#' + formId + ' .' + validate_type + 'txt');
		if (errtype) {
			that.addClass('m-member-orange');
			if (txt.size() == 0) {
				if (tagtype == "groupvalidate" || validate_type == "yzm") {
					obj.parent().append('<span class="' + validate_type + 'txt m-notice m-err errclass"><i></i>' + ECar.validate.config[formId][validate_type][errtype] + '</span>');

				} else {
					that.after('<span class="' + validate_type + 'txt m-notice m-err errclass"><i></i>' + ECar.validate.config[formId][validate_type][errtype] + '</span>');
				}
			} else {
				txt.show().html('<i></i>' + ECar.validate.config[formId][validate_type][errtype]);
			}
		} else {
			that.removeClass('m-member-orange');
			txt.hide();
			// added by CD
			if (globalPara.showCorrectHint) {
				var $correctHint = obj.siblings(".icon-checked-m");
				if ($correctHint.length === 0) {
					$correctHint = $("<span class=\"icon icon-checked-m\"></span>");
					obj.last().after($correctHint);
				}
				$correctHint.css("display", "inline-block");
			}
		}
	}



	//开始
	ECar.validate.init = function(param) {
		var formId = param.formid;
		var config = param.config;
		globalPara = param;
		ECar.validate.config[formId] = $.extend({}, ECar.validate.config, config, {
			formId: formId
		});
		var formId = ECar.validate.config[formId].formId;

		var ajaxcheck = true;
		var sub = false;

		$('#' + formId + ' .txt').hide();
		//提交验证
		ECar.validate.validRepassword = function(formId) {
			$('#' + formId + ' input[validate="repassword"]').blur();
		}

		ECar.validate.init.submit = function(id) {
			var formId = id;
			var ajaxcheck = false;
			var remoteArr = [];
			$('#' + formId + ' input[validate]').each(function() {
				var that = $(this);
				if (that.attr('type') == 'text' || that.attr('type') == 'password') {
					$(this).siblings('.txt').hide();
					that.blur();
					//that.focus();

					var ajax = that.data("remote");
					if (ajax && ajax.readyState != 4) {
						remoteArr.push(ajax);
						$(document).ajaxComplete(remoteComplete);
					}
				}
			});

			//checkbox radio select
			$('#' + formId + ' [groupvalidate]').each(function() {
				var $this = $(this);
				var groupvalidate = $this.attr('groupvalidate').split('@');
				var type = groupvalidate[0];
				var validate_type = groupvalidate[1];

				if (type == 'radio' || type == 'checkbox') {
					var flag = $(this).find('input:checked').size() > 0 ? 0 : 1;
				}

				if (type == 'select') {
					var len = $(this).find('select').length;
					var flag = 0;
					for (var i = 0; i < len; i++) {
						var $test = $(this).find('select').eq(i);
						if ($test.val() == '' || !$test.val() || $test.val() === "0") {
							flag = 1;
							break;
						}
					}
				}
				showMessage(formId, $(this).children(), validate_type, flag, 'groupvalidate');
			});

			//单个 select
			$('#' + formId + ' select[validate]').each(function() {
				var $this = $(this);
				//var name=$this.attr('name');
				var validate_type = $this.attr('validate');
				var flag;
				if (!$this.val() && $this.attr('rel-required')) {
					flag = 1;
				} else {
					flag = 0;
				}
				showMessage(formId, $(this), validate_type, flag, '');
			});
			if (remoteArr.length == 0) {
				return checkReturn();
			}

			function checkReturn() {
				if ($('#' + formId + ' .errclass:visible').size() > 0) {
					sub = false;
				} else {
					sub = true;
				}
				return sub;
			}

			function remoteComplete(e, xhr, settings) {
				remoteArr.splice(remoteArr.indexOf(xhr), 1);
				if (remoteArr.length == 0) {
					if ($('#' + formId + ' .errclass:visible').size() > 0) {
						sub = false;
					} else {
						sub = true;
					}
				}
			}
		}

		$('#' + formId + ' select[validate="cardtype"]').change(function() {
			if ($('#' + formId + ' [validate="cardnum"]').val() != '') {
				$('#' + formId + ' [validate="cardnum"]').blur();
			} else {
				//$('#'+formId+' [validate="cardnum"]').parent().find('span').remove();
				$('#' + formId + ' [validate="cardnum"]').parent().find('input').removeClass('m-member-orange');
			}
		});


		// added by CD
		
		// -----------

		$('#' + formId + ' input:not([type="submit"])').on('blur', function(ajaxcheck) {
			//var name=$(this).attr('name');
			var validate_name = $(this).attr('validate');
			$(this).siblings('.txt').hide();
			showMessage(formId, $(this), validate_name, validElement($(this), ajaxcheck), '');
		});

		$('#' + formId + ' input').on('focus', function() {
			$(this).siblings('.m-err').hide();
			$(this).siblings('.txt').show();
		});

	}


	//验证后出现对应信息
	function showMessage(formId, obj, validate_type, num, tagtype) {
		switch (num) {
			case 1:
				ECar.validate.message(formId, obj, validate_type, 'empty', tagtype);
				break;
			case 2:
				ECar.validate.message(formId, obj, validate_type, 'err', tagtype);
				break;
			case 3:
				ECar.validate.message(formId, obj, validate_type, 'remoteerr', tagtype);
				break;
			case 0:
				ECar.validate.message(formId, obj, validate_type, '', tagtype);
		}
	}

	//开始验证 start & end
	function validElement(element, ajaxcheck) { //debugger

		var result = checkSuccess(element.attr('validate'), element);
		if (result == 0 && element.attr('checkPath')) {
			checkRemoteSucess(element);
		}
		return result;
	}
	//是否需要服务端验证
	function checkRemoteSucess(element) {
		if (element.attr('checkPath')) {
			var flag;
			var url = element.attr('checkPath');
			var preAjax = element.data("remote");
			if (preAjax && preAjax.readyState != 4) {
				element.data("remote").abort();
			}
			element.data("remote", $.ajax({
				type: 'POST',
				url: url + "?d=" + new Date().getMilliseconds(),
				data: {
					'parm': element.val()
				},
				success: function(data) {
					flag = Number(data) == 0 ? 0 : 3;
					var formId = $(element).parents('form').attr('id');
					var validate_name = $(element).attr('validate');
					showMessage(formId, $(element), validate_name, Number(flag), '');
				}
			}));
		}
	}


	//进行验证
	function checkSuccess(method, element) {
		if (method) {
			var nullResult = checkNull(element);
			if (nullResult == 0) {

				if (element.attr('depend')) {
					var depend = element.attr('depend');
					var form = element.parents('form').attr('id');
					method = Number($('#' + form + ' [validate="' + depend + '"]').val());
					method = method == 110001 ? 'cardId' : 'cardnum';
				}


				if ((!element.attr('rel-required') && $.trim(element.val()) == '') || ECar.validate[method](element)) {
					return 0;
				} else {
					return 2;
				}
			} else {
				return nullResult;
			}
		}
		return 0;
	}
	//判断你是为空 是否必须
	function checkNull(element) {
		if (element.attr('rel-required')) {
			if ($.trim(element.val()) == '') {
				return 1;
			} else {
				return 0;
			}
		}
		return 0;
	}



	///////////////////////////////////身份证验证

	function isIdCardNo(num) {
		var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
		var error;
		var varArray = new Array();
		var intValue;
		var lngProduct = 0;
		var intCheckDigit;
		var intStrLen = num.length;
		var idNumber = num;

		if ((intStrLen != 15) && (intStrLen != 18)) {
			return false;
		}
		// check and set value 
		for (i = 0; i < intStrLen; i++) {
			varArray[i] = idNumber.charAt(i);
			if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
				//error = "错误的身份证号码！."; 
				//alert(error); 
				//frmAddUser.txtIDCard.focus(); 
				return false;
			} else if (i < 17) {
				varArray[i] = varArray[i] * factorArr[i];
			}
		}
		if (intStrLen == 18) {
			//check date 
			var date8 = idNumber.substring(6, 14);
			if (checkDate(date8) == false) {
				//error = "身份证中日期信息不正确！."; 
				//alert(error); 
				return false;
			}
			// calculate the sum of the products 
			for (i = 0; i < 17; i++) {
				lngProduct = lngProduct + varArray[i];
			}
			// calculate the check digit 
			intCheckDigit = 12 - lngProduct % 11;
			switch (intCheckDigit) {
				case 10:
					intCheckDigit = 'X';
					break;
				case 11:
					intCheckDigit = 0;
					break;
				case 12:
					intCheckDigit = 1;
					break;
			}
			// check last digit 
			if (varArray[17].toUpperCase() != intCheckDigit) {
				//error = "身份证效验位错误!...正确为： " + intCheckDigit + "."; 
				//alert(error); 
				return false;
			}
		} else { //length is 15 
			//check date 
			var date6 = idNumber.substring(6, 12);
			if (checkDate(date6) == false) {
				//alert("身份证日期信息有误！."); 
				return false;
			}
		}
		//alert ("Correct."); 
		return true;
	}

	function checkDate(date) {
		return true;
	}


	//判断浏览器
	(function(userAgent) {
		this.browser = {
			version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
			safari: /webkit/.test(userAgent),
			opera: /opera/.test(userAgent),
			msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
			mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
		};
	})(navigator.userAgent.toLowerCase());
	//	browser.msie&&(alert('IE:'+browser.version));   
	//	browser.mozilla&&(alert('firefox:'+browser.version)); 
	//	browser.opera&&(alert('opera:'+browser.version));
	//	browser.safari&&(alert('safari:'+browser.version)); 

	//IE7兼容focus时间
	$("input.m-member").on("focus", function() {
		$(this).addClass("m-member-focus");
	});
	$("input.m-member").on("focusout", function() {
		$(this).removeClass("m-member-focus");
	});

})(jQuery, window.ECar || (window.ECar = {}));