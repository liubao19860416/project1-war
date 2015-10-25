/*

ECar.customRadio.js
替换自定义的radio button

Author: CHEN Di
Date: 双12
*/

;
(function($, ECar) {
	var defaults = {};
	ECar.customRadio = function(target, options) {
		if (target.length < 1) {
			return;
		}
		var settings = $.extend(true, {}, defaults, options);
		target.each(function(indx, elem) {
			var $this = $(elem),
				_htmlWrapper,
				checked = $this.is(':checked');

			_htmlWrapper = generateWrapperHTML(checked);
			$this.hide().wrap(_htmlWrapper);
		});

		var $clickArea =
			settings.clickableParent ? target.closest(settings.clickableParent) : target.parent('span.' + settings.customRadio);
		$clickArea.css('cursor', 'pointer');
		var $highlight =
			settings.highlight ? target.closest(settings.highlight.target) : undefined;
		$clickArea.on('click', function() {
			var $this = $(this);
			var $spanWrapper =
				settings.clickableParent ? $this.children('span.' + settings.customRadio).eq(0) : $this;
			if ($spanWrapper.hasClass(settings.customRadioChecked)) {
				return;
			} else {
				target.attr('checked', false);
				$spanWrapper.children('input').eq(0).attr('checked', true);
				target.parent('span') // clear all
				.removeClass(settings.customRadioChecked)
					.addClass(settings.customRadioUnChecked);
				$spanWrapper
					.removeClass(settings.customRadioUnChecked)
					.addClass(settings.customRadioChecked);
				// 加highlight
				if (settings.highlight) {
					$highlight.removeClass(settings.highlight.styleClass);
					$spanWrapper.closest(settings.highlight.target).addClass('highlight');
				}
				
			}
		});
		// <span class="custom-radio custom-radio-checked">
		function generateWrapperHTML(checked) {
			var _html = ["<span class=\"", settings.customRadio, ' ', settings.customRadioChecked, "\"></span>"];

			if (!checked) {
				_html.splice(3, 1, settings.customRadioUnChecked);
			}
			return _html.join('');
		}
	};
})(jQuery, window.ECar || (window.ECar = {}));