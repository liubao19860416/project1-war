/**
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * Author:   陈迪
 * Date:     2014-04-18
 * Description: 顺序显示动画
 * 
 */

(function ($, ECar) {
	ECar.sequentialAnimate = function($objs) {
		var syncRun = function(arr) {
			var promise = $.Deferred().resolve().promise(),
				makeRun = function(func, cntxt, args) {
					return function() {
						func = func.apply(cntxt, args);
						return (func.promise ? func.promise() : func);
					}
				};
			for (var i = 0, length = arr.length; i < length; i++) {
				var task = arr[i],
					context = task.shift(),
					func = task.shift();

				promise = promise.then(makeRun(func, context, task));
			}
		};

		syncRun($imgArr.map(function(idx, el) {
			return [[$(el), $.fn.animate, {
					opacity: 0
				},
				1000
			]];
		}));
	};
} (jQuery, window.ECar || (window.ECar={})));