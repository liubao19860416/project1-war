(function($, ECar) {
	/*
	 *	1F 看车 --- 价格区间 --- tab ajax切换效果
	 */
	ECar.tab({
		selector: ".model-contents-tabs",
		event: "click",
		delay: 200,
		callback: function(id) {
			// console.log(id);
			// $("#"+id).load(/*url*/, /*data*/id); // plz return HTML fragments back
		}
	});

	/*
	 *	1F 看车 --- 精美图库 --- 图片标语滑动效果
	 */
	$.fn.hoverShowTitle = function(heightEnd, hightBegin) {
		var $picWindow = this;
		$picWindow.on("mouseover", function() {
			$titleBar = $(this).find(".gallery-banner");
			$titleBar.stop().animate({
				height: heightEnd
			}, 100);
		});
		$picWindow.on("mouseleave", function() {
			$titleBar = $(this).find(".gallery-banner");
			$titleBar.stop().animate({
				height: hightBegin
			}, 100);
		});
	};
	$(".gallery-window").hoverShowTitle(40, 0); // 6个小窗口
	$(".gallery-ad-window").hoverShowTitle(60, 40); // 1个大窗口 --- 推广位

	/*
	 *	1F 看车 --- 精美图库 --- 图片更随鼠标滑动
	 */
	// todo
	$.fn.hoverMoveImg = function(options) {
		var $picWindows = this,
			sensitiveness = options.sensitiveness;
		$picWindows.each(function(idx, ele) {
			var $picWindow = $(ele),
				$pic = $picWindow.find(".gallery-img"),
				windowWidth = $picWindow.innerWidth(),
				picWidth = $pic.innerWidth(),
				ratio = (sensitiveness * (picWidth - windowWidth)) / windowWidth;
				moveRange = {
					leftMost: windowWidth - picWidth,
					rightMost: 0
				},
				startPosition = {
					pageX: null,
					pageY: null,
					leftDst: null
				};

			$picWindow.on("mouseenter", function(e) {
				startPosition.pageX = e.pageX;
				startPosition.pageY = e.pageY;
				startPosition.leftDst = parseFloat($pic.css("left"));
				// console.log(startPosition);
			});

			$picWindow.on("mousemove", function(e) {
				var currentPosition = {
						pageX: e.pageX,
						pageY: e.pageY
					},
					deltaX = currentPosition.pageX - startPosition.pageX,
					destPos = startPosition.leftDst + deltaX * ratio; // 目标位置
					// console.log("radio: ", ratio);
				// update startPosition
				startPosition.pageX = currentPosition.pageX;
				startPosition.pageY = currentPosition.pageY;

				if (outOfRange(moveRange, destPos, deltaX)) { // 再移动就超出了
					return;
				}
				$pic.css("left", startPosition.leftDst=destPos); // update only when the $pic moves
			});

			function outOfRange(moveRange, destPos, deltaX) {
				return (deltaX > 0 && destPos > moveRange["rightMost"]) ||
							(deltaX < 0 && destPos < moveRange["leftMost"]);
			}

			$picWindow.on("mouseleave", function() {
				// reset to initial position ?
			});
		});
	};
	$(".gallery-window").add(".gallery-ad-window").hoverMoveImg({sensitiveness: 3});

}(jQuery, window.ECar || (window.ECar = {})));