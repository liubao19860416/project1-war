/* indexIm.js */
// use jquery

$(window).on("load", function() {
	$("#imblock .mainsite-im").on("click", function() {
		var prodImUrl = "http://kf1.chexiang.com/new/client.php?unique_id=&unique_name=&arg=admin&style=2&l=zh-cn&lytype=0&charset=gbk&referer=http%3A%2F%2Fwww.chexiang.com%2F&isvip=bcf14bbb85a346c2fb52e8cea8822cce&identifier=&keyword=&tfrom=1&tpl=crystal_blue";
		window.open(prodImUrl.replace(/.chexiang./g, "."+imBase+"."), "车享客服", "height=573, width=803, top=80, left=300,toolbar=no, menubar=no, scrollbars=no, resizable=yes, location=n o, status=no");
	});
	$("#imblock .backtoTop").on("click", function() {
		var $window = $(window);
		if($window.scrollTop() <=0 ) return;
		var timeoutId = setInterval(function() {
			if ($window.scrollTop() > 0) {
				var d = $window.scrollTop();
				$window.scrollTop(d-30);
			} else {
				clearInterval(timeoutId);
			}
		}, 1);
	});
	(function () {
		var $weixinIcon = $("#imblock .mainsite-weixin"),
			$code = $weixinIcon.children(".weixin-code").eq(0),
			$weixinSubIcon = $("#imblock .mainsite-weixin-sub"),
			$codesub = $weixinSubIcon.children(".weixin-code").eq(0),
			showFlag = "none";
		function toggleCode(flag) {
			if(flag === "none") {
				$weixinIcon.removeClass("highlight");
				$code.hide();
				$weixinSubIcon.removeClass("highlight");
				$codesub.hide();
			} else if(flag === "sub") {
				$weixinIcon.removeClass("highlight");
				$code.hide();
				$weixinSubIcon.addClass("highlight");
				$codesub.show();
			} else if (flag === "ser") {
				$weixinIcon.addClass("highlight");
				$code.show();
				$weixinSubIcon.removeClass("highlight");
				$codesub.hide();
			}
		}
		toggleCode(showFlag);
		$weixinIcon.on("click", function (e) {
			if(showFlag !== "ser") {
				toggleCode(showFlag = "ser");
			}
			e.stopPropagation();
		});
		$weixinSubIcon.on("click", function (e) {
			if(showFlag !== "sub") {
				toggleCode(showFlag = "sub");
			}
			e.stopPropagation();
		});
		$("body").on("click", function() {
			if(showFlag!== "none") {
				toggleCode(showFlag = "none");
			}
		})
	}());
});