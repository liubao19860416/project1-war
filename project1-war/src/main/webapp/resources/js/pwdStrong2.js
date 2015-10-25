		/*
		密码强度
		WangJingLiang 2013-12-2
		pwdCheck.init(e,value,obj);
		e 事件对象  value值
		*/
		 //灰色：-1 弱：0 ，中：1，强：2
		var pwdCheck = {
			init: function(e, val, obj) {
				pwdCheck.init._obj = obj;
				var keycode = e.keyCode;
				// if(keycode<=33&&keycode!=8&&keycode!=46)return;
				if (val == "" || val.length < 6) {
					this.setClass(-1);
				} else {
					this.start(val);
				}
			},
			start: function(val) {
				var strong = this.spit(val);
				this.setClass(strong); //返回结果并设置样式
				pwdCheck.init._obj.find('input').val(strong);
			},
			spit: function(val) { //字符 拆分重组
				var tolow = [],
					toupp = [],
					tonum = [],
					tother = [],
					len = val.length;
				for (var i = 0; i < len; i++) {
					var charcode = val.charCodeAt(i),
						ch = val[i];
					if (charcode >= 48 && charcode <= 57) {
						tonum.push(ch);
					} else if (charcode >= 65 && charcode <= 90) {
						toupp.push(ch);
					} else if (charcode >= 97 && charcode <= 122) {
						tolow.push(ch);
					} else {
						tother.push(ch);
					}
				}

				return this.score(tolow, toupp, tonum, tother, len);
			},
			setClass: function(i) {
				var classname = ['pwdline1', 'pwdline2', 'pwdline3'];
				pwdCheck.init._obj.removeClass('pwdline1 pwdline2 pwdline3').addClass(classname[i]||"");
			},
			score: function(low, upp, num, other, len) {

				var points = null,
					lenArr = [low.length, upp.length, num.length, other.length],
					sum = this.utility.sum(lenArr),
					diverNum = this.utility.diversity(lenArr);

				if (sum > 6 && diverNum >= 3) {
					points = 2;
				} else if (sum > 8 && diverNum === 2) {
					points = 1;
				} else {
					points = 0;
				}

				return points;
			},
			utility: {
				sum: function(lenArr) {
					var sum = 0;
					for (var i = 0, len = lenArr.length; i < len; i++) {
						sum += lenArr[i];
					}
					return sum;
				},
				diversity: function(lenArr) {
					var diverNum = 0;
					for (var i = 0, len = lenArr.length; i < len; i++) {
						if (lenArr[i] > 0) {
							diverNum += 1;
						}
					}
					return diverNum;
				}
			}
		};