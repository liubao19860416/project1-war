/**
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * Author:   许祥成
 * Date:     2013-12-20
 * Description: Text area 内容倒数计数。读取textarea的maxlength为最多字数，取data-countdown-for={textarea id}的dom显示剩余字数
 * 
 */                                 
;(function($,ECar){
	/**
	 * @params textarea 要计数的textarea的dom或selector
	 * 			options 其它参数
	 */
ECar.countdown=function(textarea,options){
	var defaults={
		zeroClass:"clr-red"  		//可输入0个数字时的dom样式
	};
	var textarea  = $(textarea);
	var textNum=parseInt(textarea.attr("maxlength"));	
	textarea.removeAttr("maxlength");
	var showIn=$("[data-countdown-for="+textarea[0].id+"]");
	options=$.extend(defaults,options||{});
	textarea.bind({
		keyup:function(){
			var content = textarea.val();				
			if(content.length>textNum){
				textarea.val(content.substring(0,textNum));
			}
			if(content.length==textNum){
				showIn.addClass(options.zeroClass);
			}else if(showIn.hasClass(options.zeroClass)){
				showIn.removeClass(options.zeroClass);
			}
			showIn.text(Math.max(0,textNum-content.length));
		}
	});
	textarea.trigger("keyup");
};

})(jQuery,window.ECar||(window.ECar={}));