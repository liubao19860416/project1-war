;(function($) {
	//验证邮箱再次发送验证邮件 1：true  0:false
	$('.valid-email-new').live('click', function(){
			//alert();
		var dataurl = $('input[name="url"]').val();
		$.ajax({
	           type:'POST',
	           url:base+ '/account/tosendEmailnew.htm' + "?d=" + new Date().getMilliseconds(),
	           data:{'str':$('input[name="str"]').val(),'style':$('input[name="style"]').val(),'styleTem':'001','userid':$('input[name="userid"]').val(),'username':$('input[name="username"]').val(),'email':$('input[name="email"]').val()},
	           success:function(data){
	        	   var verifyHtmlErr = '<div class="clearfix"><p class="btn-default"><a class="btn" href="http://'+dataurl+'" target="_blank">查看验证邮件</a></p><p class="time-out">已经发送3次验证邮件,如果没有收到邮件,请检查邮箱是否正确,或一小时后重新验证。</p></div>'
	                  + '<p class="notic">如果点击“查看验证邮件”没反应，请自行登录个人邮箱！</p>';
	        	   if (data == '0') {
	        		   $('.pl-50').html(verifyHtmlErr);
	        	   }
	           }
	    });
	});
	
})(jQuery);