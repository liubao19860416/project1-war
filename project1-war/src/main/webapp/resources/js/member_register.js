/**
 *
 */
;
(function($) {
	window.chageCodeImage = function(id) {
		document.getElementById(id).src = base + "/account/validateCode.htm?d=" + new Date().getTime();
	}
	$(function() {
		// ECar.validate.init({
		// 	formid: 'register-infor'
		// });

		// $('.registerbut input').click(function() {
		// 	var $form = $('#register-infor');
		// 	if (ECar.validate.init.submit('register-infor')) {
		// 		$form.submit();
		// 	}
		// });

		

		$('#register-infor [validate="password"]').keyup(function(event) {
			var e = window.event || event;
			pwdCheck.init(e, $(this).val(), $('.register-infor .pwdline'));
		}).trigger("keyup");


		// $('[validate="yzm"]').focus(function() {
		// 	$('#codeMsg').remove();
		// });

		// $('[validate="sub"]').focus(function() {
		// 	$('#codeMsg').remove();

		// });

		// 用户协议checkbox美化
		$('.remember .check').toggle(function() {
			$(this).removeClass('ticks');
			$('.remember .checkbox').attr('checked', false);
			$(".remember").find("span.m-err").show();
		}, function() {
			$(this).addClass('ticks');
			$('.remember .checkbox').attr('checked', true);
			$(".remember").find("span.m-err").hide();
		});
		$('[for="ifRemenberMe"]').click(function() {
			$('.remember .check').click();
		});

		// ----------------------------------------  验证  ----------------------------------------
		// 隐藏域 表明是哪种类型的账户
		var $typeIndicator = $("input[name='userNameType']");

		$("input.excluded").off();
		// 车享账号输入
		var account = function() {
			var $accInput = $(".account"),
				$accTip = $accInput.closest("dd").children('.tip'),
				$accWrongMsg = $accInput.closest("dd").children(".m-err"),
				$accWrongTxt = $accWrongMsg.find(".errTxt"),
				$correctHint = $accInput.closest("dd").children('.icon-checked-m'),
				typeNameConverter = {
					"mobile": "手机号",
					"email": "邮箱",
					"username": "用户名"
				},
				inputType = null,
				state = false;
			$accInput.on("focus", function() {
				$accTip.show();
				$accWrongMsg.hide();
				$correctHint.hide();
				$accInput.removeClass("m-member-orange");
			});
			var rule = {
				basicRule: /^[a-zA-Z0-9@]*$/,
				mobile: /^1[3,4,5,7,8]\d{9}$/,
				onlyNum: /^[0-9]*$/,
				email: /^[0-9a-zA-Z][_.0-9A-Za-z-]{0,31}@([0-9A-Za-z][0-9A-Za-z-]{0,30}\.){1,4}[A-Za-z]{2,4}$/
			};
			$accInput.on("blur", validate);

			function validate() {
				$accTip.hide();
				// 验证部分
				var result;
				var userInput = $accInput.val();
				if (userInput.match(rule.mobile)) {
					result = "mobile";
				} else if (rule.email.test(userInput)) {
					result = "email";
				} else if (userInput.length === 0) {
					showWrongMsg("车享账号一定要填写喔");
				} else if (!(rule.basicRule.test(userInput))) {
					showWrongMsg("用户名只可以用数字和字母喔");
				} else if (userInput.length < 6 || userInput.length > 20) {
					showWrongMsg("账号需要6-20位长哟");
				} else if (rule.onlyNum.test(userInput) && !rule.mobile.test(userInput)) {
					showWrongMsg("用户名不能是纯数字，请确认输入的是手机号或者重新输入");
				} else if (userInput.indexOf("@") !== -1 && !rule.email.test(userInput)) {
					showWrongMsg("您输入的邮箱地址有误喔，检查一下吧");
				} else {
					result = "username";
				}
				inputType = result ? typeNameConverter[result] : null;
				// console.log(result);
				renewState(result);
				renewYzm(result);
				renewTypeIndicator(result);
				return ajaxCheck(result, userInput);
			}

			function showCorrectIndicator(result) {
				if (result) {
					$correctHint.show();
				}
			}

			function getState() {
				return state;
			}

			function renewState(result) {
				state = !!result;
			}

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
			}

			function renewYzm(result) {
				if (result == "mobile") {
					$picCapcha.hide();
					$mobileCapcha.show();
				} else {
					$mobileCapcha.hide();
					$picCapcha.show();
				}
			}

			function showWrongMsg(txt) {
				$accWrongTxt.html(txt);
				$accWrongMsg.eq(0).show().siblings(".m-err").hide();
				$accInput.addClass("m-member-orange");
			}

			
			function ajaxCheck(localCheckResult, userInput) {
				if (localCheckResult) {
					$accInput.removeClass("m-member-orange");
					return $.ajax({
						url: base + "/account/userIsExist.htm", // 请向飞填入
						dataType: "JSON",
						data: {
							userName: userInput,
							userNameType: $typeIndicator.val()
						},
						type: "POST",
						success: function(removeCheckResult) {
							var remoteCheckResult = removeCheckResult.isExist;
							mobileCapcha.enable();
							// 根据检查结果更新页面提示用户
							if (remoteCheckResult === "0") {
								// 成功 ---> 显示正确信息
								$correctHint.show();
								renewState(true);
							} else if (remoteCheckResult === "1") {
								var backUrl = $("#backUrl").val();
								showWrongMsg("您输入的" + inputType + "已被注册过啦，" + "<a href=\"" + base + "/account/login.htm?backUrl=" +backUrl+ "\">点此直接登录</a>吧!");
								renewState(false);
								if (inputType === "手机号") {
									mobileCapcha.disable();
								}
							} else if (remoteCheckResult === "2") {
								var backUrl = $("#backUrl").val();
								var aHref = base + "/account/presendEmailagain.htm?email=" + userInput+"&backUrl="+backUrl;
								showWrongMsg("您的邮箱处于未激活状态哟，" +  "<a href=\"" + aHref + "\">点此重发验证邮件</a>吧!");
								renewState(true);
							}
						},
						error: function() {
							// 提交失败的情况
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
		// 设置密码
		var password = (function() {
			var $input = $("input[validate='password']"),
				$tip = $input.siblings('.tip'),
				$wrongMsg = $input.siblings(".m-err"),
				$wrongTxt = $wrongMsg.find(".errTxt"),
				$correctHint = $input.siblings('.icon-checked-m'),
				state = false;
			$input.on("focus", function() {
				$tip.text("您需要输入6-20位字符哟，使用字母、数字或符号组合更安全").show();
				$wrongMsg.hide();
				$correctHint.hide();
				$input.removeClass("m-member-orange");
			});
			$input.on("blur", validate);

			function validate() {
				// 验证
				$tip.hide();
				var result = innerValidate();
				if (!result.ok) {
					$wrongTxt.text(result.message)
					$wrongMsg.show();
					$input.addClass("m-member-orange");
					state = false;
				} else {
					if (result.message) {
						$tip.text(result.message).show();
					} else {
						// show 正确图标
						$correctHint.show();
					}
					state = true;
				}
				if (repassword.$input.val()) {
					repassword.$input.trigger("blur");
				}
			}
			var rule = {
				allNumber: /^[0-9]{6,20}$/
			};

			function getState() {
				return state;
			};

			function innerValidate() {
				var result = {
					ok: true,
					message: null
				};
				var userInput = $input.val();
				if (userInput.length === 0) {
					result.ok = false;
					result.message = "不要心急哟，密码还空着呐";
				} else if (userInput.length < 6 || userInput.length > 20) {
					result.ok = false;
					result.message = "密码需要6-20位长哟";
				} else if (rule.allNumber.test(userInput)) {
					result.ok = true;
					result.message = "密码还可以再复杂一些喔，如字母+数字的组合，这样账号安全性会大大提升";
				} else {
					result.ok = true;
					result.message = null;
				}

				return result;
			}

			return {
				$input: $input,
				state: getState,
				validate: validate
			};
		})();
		// 重复输入密码
		var repassword = (function() {
			var $input = $("input[validate='repassword']"),
				$tip = $input.siblings('.tip'),
				$wrongMsg = $input.siblings(".m-err"),
				$wrongTxt = $wrongMsg.find(".errTxt"),
				$correctHint = $input.siblings(".icon-checked-m"),
				state = false;

			function getState() {
				return state;
			}
			$input.on("focus", function() {
				$tip.text("再次核对您的密码喔").show();
				$wrongMsg.hide();
				$correctHint.hide();
				$input.removeClass("m-member-orange");
			});
			$input.on("blur", validate);

			function validate() {
				// 验证
				$tip.hide();
				var result = innerValidate();
				if (!result.ok) {
					$wrongTxt.text(result.message)
					$wrongMsg.show();
					$input.addClass("m-member-orange");
					state = false;
					$correctHint.hide();
				} else {
					$wrongMsg.hide();
					state = true;
					// show 正确图标
					$correctHint.show();
					$input.removeClass("m-member-orange");
				}
			}
			// var rule = {
			// 	matchPassword:$("input[validate='password']").val()
			// };

			function innerValidate() {
				var result = {
					ok: true,
					message: null
				};
				var userInput = $input.val();
				if (userInput.length === 0) {
					result.ok = false;
					result.message = "不要心急哟，确认密码还空着呐";
				} else if ($("input[validate='password']").val() != userInput) {
					result.ok = false;
					result.message = "您两次输入的密码不一致喔";
				} else {
					result.ok = true;
					result.message = null;
				}

				return result;
			}

			return {
				$input: $input,
				state: getState,
				validate: validate
			};
		})();

		var countDownTemp = "<span class='timeLeft'>120</span>秒后重新发送";
		// 手机 --> 手机验证码
		var $mobileCapcha = $(".sms");
		mobileCapcha = function() {
			var dom = $mobileCapcha,
				btn = dom.find(".btn"),
				$tip = dom.find(".m-notice.tip"),
				countingDown = false,
				isEnabled = true;
			btn.on("click", function() {
				if (countingDown) return;
				account.validate().done(function() {
					if (account.state() && enabled()) {
						$.ajax({
							url: base + '/account/toGetPhoneCodenew.htm' + "?d=" + new Date().getMilliseconds(),
							type: "POST",
							data: {
								Num: account.$input.val(),
								'temStyle': $("#mobTemStyle").val(),
								'typeId': $("#mobileTypeId").val()
							},
							dataType: "JSON",
							success: function(data) {
								if (data === 0) {
									// 倒计时
									btn.html(countDownTemp);
									disable();
									$tip.show();
									// 修改样式
									countDown(btn.find(".timeLeft"), 120 * 1000, function() {
										btn.html("获取验证码").removeClass("btn-gray btn-disable");
										enable();
										countingDown = false;
										$tip.hide();
									});
									countingDown = true;
								}
							},
							error: function() {
								capcha.showWrongMsg("请求发送验证码失败，请重新再试！");
							}
						});
					}
				})
			});

			function disable() {
				btn.addClass("btn-gray btn-disable");
				isEnabled = false;
			}

			function enable() {
				if (countingDown) return;
				btn.removeClass("btn-gray btn-disable");
				isEnabled = true;
			}

			function enabled() {
				return isEnabled;
			}

			function countDown($timeLeft, time, finish) {
				var total = time,
					left = time;

				var id = setInterval(function() {
					left -= 1000;
					$timeLeft.text(parseInt(left / 1000));
				}, 1000);
				setTimeout(function() {
					clearInterval(id);
					finish();
				}, total);
			}

			return {
				dom: dom,
				enable: enable,
				disable: disable
			};
		}();
		// 其他 --> 图形验证码
		var $picCapcha = $(".yzm");
		// 验证码检测 -- 只判断非空
		var capcha = function() {
			var $input = $("#codeId"),
				$wrongMsg = $input.siblings("#emailErr"), //防止后台效验同时出现,lwf0617
				$wrongTxt = $wrongMsg.find(".errTxt"),
				state = false;

			function getState() {
				return state;
			}
			$input.on("blur", validate);

			function validate() {
				if ($.trim($input.val()).length === 0) {
					$wrongTxt.text("哎呀，验证码好像不正确");
					$wrongMsg.show();
					$input.addClass("m-member-orange");
					state = false;
				} else {
					state = true;
				}
			}

			$input.on("focus", function() {
				$wrongMsg.hide().siblings(".m-err").hide(); //防止后台效验同时出现,lwf0617
				$input.siblings('#codeMsg').hide();
				$input.removeClass("m-member-orange");
			});

			return {
				$input: $input,
				state: getState,
				validate: validate,
				showWrongMsg: function(msg) {
					$wrongTxt.text(msg);
					$wrongMsg.show();
					$input.addClass("m-member-orange");
				}
			};
		}();
		// 同意协议
		var agreement = function() {
			var $input = $("#ifRemenberMe"),
				state = false;

			function getState() {
				return state;
			}

			function validate() {
				if (!$input.attr("checked")) {
					state = false;
				} else {
					state = true;
				}
			}
			$input.blur(validate);
			return {
				$input: $input,
				state: getState,
				validate: validate
			};
		}();
		// 表单提交
		var $submitBtn = $(".registerbut .btn"),
			$form = $("#register-infor");
		var validateItems = [account, password, repassword, capcha, agreement];
		$submitBtn.on("click", function() {
			validation = [];
			// 提交表单	
			$.each(validateItems, function() {
				validation.push(this.validate());
			});
			$.when.apply(null, validation).done(function() {
			var validated = true;
			$.each(validateItems, function() {
				if (this.state() === false) {
					validated = false;
					return false;
				}
			});
			if (validated) {
				$form.submit();
			}
		});
		});
		
		var utye = $typeIndicator.val();
		if (utye == "1") {
			 $(".yzm").hide();
			 $(".sms").show();
		}
		// placeholder
		ECar.placeholder($(".account")); //只有车享帐号需要用到
	});
})(jQuery);