/* verifyAccount.js */

var account = function() {
	var $accInput = $(".account"),
		$accWrongMsg = $accInput.siblings(".m-err"),
		$accWrongTxt = $accWrongMsg.find(".errTxt"),
		typeNameConverter = {
			"mobile": "手机号",
			"email": "邮箱",
			"username": "用户名"
		},
		inputType = null,
		state = false;
	$accInput.on("focus", function() {
		$accWrongMsg.hide();
		$accInput.removeClass("m-member-orange");
	});
	var rule = {
		basicRule: /^[a-zA-Z0-9@]*$/,
		mobile: /^1[3,4,5,7,8]\d{9}$/,
		onlyNum: /^[0-9]*$/,
		email: /^[0-9a-zA-Z][_.0-9A-Za-z-]{0,31}@([0-9A-Za-z][0-9A-Za-z-]{0,30}\.){1,4}[A-Za-z]{2,4}$/
	};
	var wrongMsg = "没有这个用户哦，再想想～～";
	$accInput.on("blur", validate);

	function validate() {
		// 验证部分
		var result;
		var userInput = $accInput.val();
		if (userInput.match(rule.mobile)) {
			result = "mobile";
		} else if (rule.email.test(userInput)) {
			result = "email";
		} else if (userInput.length === 0) {
			showWrongMsg(wrongMsg);
		} else if (!(rule.basicRule.test(userInput))) {
			showWrongMsg(wrongMsg);
		} else if (userInput.length < 6 || userInput.length > 20) {
			showWrongMsg(wrongMsg);
		} else if (rule.onlyNum.test(userInput) && !rule.mobile.test(userInput)) {
			showWrongMsg(wrongMsg);
		} else if (userInput.indexOf("@") !== -1 && rule.email.test(userInput)) {
			showWrongMsg(wrongMsg);
		} else {
			result = "username";
		}
		inputType = result ? typeNameConverter[result] : null;
		// console.log(result);
		renewState(result);
//		renewTypeIndicator(result);
		return ajaxCheck(result, userInput);
	}

	function getState() {
		return state;
	}

	function renewState(result) {
		state = !!result;
	}
	/*
	function renewTypeIndicator(result) {
		switch (result) {
			case "mobile":
				$typeIndicator.val(1);
				break;
			case "email":
				$typeIndicator.val(2);
				break;
			case "username":
				$typeIndicator.val(3);
				break;
		}
		// console.log($typeIndicator.val());
	}*/

	function showWrongMsg(txt) {
		$accWrongTxt.html(txt);
		$accWrongMsg.show();
		$accInput.addClass("m-member-orange");
	}

	function ajaxCheck(localCheckResult, userInput) {
		if (localCheckResult) {
			$accInput.removeClass("m-member-orange");
			return $.ajax({
				url: base + "/account/findPassWord/userIsExist.htm", // fjfjfjjjjjjjjjjjjjjjjjj
				dataType: "JSON",
				data: {
					userName: userInput/*,
					userNameType: $typeIndicator.val()*/
				},
				type: "POST",
				success: function(removeCheckResult) {
					
					var remoteCheckResult = removeCheckResult.isExist,
						msg = removeCheckResult.msg;
//					mobileCapcha.enable();
					// 根据检查结果更新页面提示用户
					if (remoteCheckResult === "0") {
						// 成功 ---> 显示正确信息
						renewState(true);
					} else /*if (remoteCheckResult === "1") {
						var backUrl = window.location.href;
						showWrongMsg("您输入的" + inputType + "已被注册过啦，" + "<a href=\"" + base + "/account/login.htm?backUrl=" + encodeURIComponent(backUrl) + "\">点此直接登录</a>吧!");
						renewState(false);
						if (inputType === "手机号") {
//							mobileCapcha.disable();
						}
					} else if (remoteCheckResult === "2") {
						var aHref = base + "/account/presendEmailagain.htm?email=" + userInput;
						showWrongMsg("您的邮箱处于未激活状态哟，" + "<a href=\"" + aHref + "\">点此重发验证邮件</a>吧!");
						renewState(true);
					}*/ {
						renewState(false);
						showWrongMsg(msg);
					}
				},
				error: function() {
					// 提交失败的情况
					// 直接算通过
					renewState(true);
				}
			});
		}
	}
	return {
		$input: $accInput,
		state: getState,
		validate: validate
	};
}();

//其他 --> 图形验证码
var $picCapcha = $(".yzm");
// 验证码检测 -- 只判断非空
var capcha = function() {
	var $input = $("#indentycode"),
		$wrongMsg = $input.siblings(".m-err"),
		$wrongTxt = $wrongMsg.find(".errTxt"),
		state = false;

	function getState() {
		return state;
	}
	$input.on("blur", function() {
		if ($.trim($input.val()).length === 0) {
			$wrongTxt.text("验证码一定要填写喔");
			$wrongMsg.show();
			$input.addClass("m-member-orange");
			state = false;
		} else {
			state = true;
		}
	});
	$input.on("focus", function() {
		$wrongMsg.hide();
		$input.siblings('#codeMsg').hide();
		$input.removeClass("m-member-orange");
	});

	return {
		$input: $input,
		state: getState
	};
}();

// 表单提交
var $submitBtn = $("#submit"),
	$form = $("#form4"),
	validateItems = [/*account,*/ capcha];
function submitValidate(e) {
	return function() {
		$.each(validateItems, function() {
			this.$input.trigger("blur");
		});
		var validated = true;
		if(!account.state()) {
			validated = false;
		}
		$.each(validateItems, function() {
			if (this.state() === false) {
				validated = false;
				return false;
			}
		});
		if(validated) {
			$form.submit();
		} else {
			e.preventDefault();
		}
	};
}
$submitBtn.on("click", function(e) {
	// 提交表单
	var remoteValidate = account.validate();
	if(remoteValidate) {
		remoteValidate.always(submitValidate(e));
	} else {
		submitValidate(e)();
	}
});