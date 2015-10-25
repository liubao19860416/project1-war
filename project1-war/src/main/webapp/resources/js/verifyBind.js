	//mobile-email-verify.html
/*
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * Author:   王景亮
 * Date:     2013-12-16
 * Description: 验证 绑定等相关JS
 * History: //修改记录
 * <author>		<time>			<desc>     
 */

;(function($) {

	var checkYzmCode=function(e,formid,value,checkcode){
		$form=$('#'+formid);			
		$.ajax({
			type:'POST',
			   url:base+ '/account/checkCodeBind.htm' + "?d=" + new Date().getMilliseconds(),
			   data:{'Num':value,'checkCode':checkcode},
			   success:function(data){
				   if(data == 0){
					   //提交form表单
					   
					   if(ECar.validate.init.submit(formid)){
							$form.submit();
						}
				   }else{
					   $('[validate="yzm"]').addClass('m-member-orange');
					   if($('[validate="yzm"]').parent().find('.errclass').size()>0){
						   $('[validate="yzm"]').parent().find('.errclass').show().html('<i></i>'+(data==1?'您输入的验证码有误，请重新输入!':'您输入的验证码已失效，请重新输入!')+'</span>'); 
					   }else{
						   $('[validate="yzm"]').parent().append('<span class="yzmtxt m-notice m-err errclass"><i></i>'+(data==1?'您输入的验证码有误，请重新输入!':'您输入的验证码已失效，请重新输入!')+'</span>');
					   }
					   if ( e && e.preventDefault ){
						   e.preventDefault();    
					   }else{
						   window.event.returnValue = false;  
					   }
					   return false;
				   }
			   }
		});
		
	}
	
	
	//绑定手机(新增手机)
    ECar.validate.init({
        formid:'bind-new-mobile'
      });

    $('#bind-new-mobile .btn').click(function(e){
		var mobile = $('#mobile').val();
		var checkCode = $("input[validate='yzm']").val();
		if(ECar.validate.init.submit('bind-new-mobile')){
			checkYzmCode(e,'bind-new-mobile',mobile,checkCode);
		}
    });

  //校验手机验证码，验证手机功能
	$('#ver-mobile .btnPhone').live('click',function(e){
		var phoneNum = $('#mobile').val();
		var checkCode = $("input[validate='yzm']").val();
		if(ECar.validate.init.submit('ver-mobile')){
			checkYzmCode(e,'ver-mobile',phoneNum,checkCode);
		}
		
	});
	
	
	//修改手机(添加新手机号码)
	 ECar.validate.init({
	      formid:'fillmobile'
	    });
	 $('#fillmobile .btn').click(function(e){
			var mobile = $('#mobile').val();
			var checkCode = $("input[validate='yzm']").val();
			if(ECar.validate.init.submit('fillmobile')){
				checkYzmCode(e,'fillmobile',mobile,checkCode);
			}
	  });

//手机，邮箱60秒验证
		$('#bind-email-loginpaswd .getcode,#bind-mobile-loginpaswd .getcode, #findPassmobile .getcode,#modifyemail .getcode,#modifyemail_updatePass .getcode,#modifymobile_upd .getcode,#modifymobile .getcode,#accoutSeruityemail .getcode,#accountSeruitymobile .getcode,#optionalForm .getcode').live('click',function(){
			var $this=$(this);
			var formid=$(this).parents('form').attr('id');
			if (formid == 'findPassmobile' || formid == 'findPassemail') {
			} else {
				$('[validate="phone"]').focus().blur();
				var pvalue=$('[validate="phone"]').val();
				if($('.phonetxt:visible').size()>0||pvalue=='')return;	
			}
			var value;
			var temStyle;
			var flag=formid.indexOf('mail')>0?true:false;			
			if(!flag){
				value=$("#mobile").val();
				temStyle = $("#mobTemStyle").val();
				typeId = $("#mobileTypeId").val();
			}else{
				value=$("#email").val();
				temStyle=$("#emailTemStyle").val();
				typeId = $("#emailTypeId").val();
			}
	
			if($(this).hasClass('getcode-gray'))return;			
			$this.addClass('getcode-gray').css('cursor','default');
			sendCode(value,temStyle,$this,typeId);
		});
		
		function sendCode(val,temStyle,obj,typeId){
			$.ajax({
				   type:'POST',
				   url:base+ '/account/toGetBindCode.htm' + "?d=" + new Date().getMilliseconds(),
				   data:{'Num':val,'temStyle':temStyle,'typeId':typeId},
				   success:function(data){
					   if (data != 0) {
						   ECar.dialog.alert("不要重复发送验证码");
						   obj.removeClass('getcode-gray').css('cursor','pointer');
					   } else {
						   $('#tab li').unbind();
							countDown({				
								obj:obj,
								speed:1000,
								wait:60,
								txt:'秒后再次发送',
								callback:Recode
							});	
					   }
				   },
				   error:function(){					   
					   obj.removeClass('getcode-gray');
				   }
				});
		}
		function Recode(obj){			  
			var num=$('#tab li.current').index();			  
			ECar.tab({
				selector : "#tab",
				start : num,
				selected:"current"
			});
			
			obj.removeClass('getcode-gray').css('cursor','pointer').text('再次发送验证码');			
		}
		
		//验证邮箱再次发送验证邮件 1：true  0:false
		$('.verify-email').live('click', function(){
			var dataurl = $('input[name="url"]').val();
			$.ajax({
		           type:'POST',
		           url:base+ '/account/tosendEmail.htm' + "?d=" + new Date().getMilliseconds(),
		           data:{'str':$('input[name="str"]').val(),'style':$('input[name="style"]').val(),'styleTem':'002'},
		           success:function(data){
		        	   var verifyHtmlErr = '<div class="clearfix"><p class="btn-default"><a class="btn" href="http://'+dataurl+'" target="_blank">查看验证邮件</a></p><p class="time-out">已经发送3次验证邮件,如果没有收到邮件,请检查邮箱是否正确,或一小时后重新验证。</p></div>'
		                  + '<p class="notic">如果点击“查看验证邮件”没反应，请自行登录个人邮箱！</p>';
		        	   if (data == '0') {
		        		   $('.pl-50').html(verifyHtmlErr);
		        	   }
		           }
		    });
		});
		
		//验证邮箱再次发送验证邮件 1：true  0:false
		$('.valid-email').live('click', function(){
			var dataurl = $('input[name="url"]').val();
			$.ajax({
		           type:'POST',
		           url:base+ '/account/tosendEmail.htm' + "?d=" + new Date().getMilliseconds(),
		           data:{'str':$('input[name="str"]').val(),'style':$('input[name="style"]').val(),'styleTem':'001'},
		           success:function(data){
		        	   var verifyHtmlErr = '<div class="clearfix"><p class="btn-default"><a class="btn" href="http://'+dataurl+'" target="_blank">查看验证邮件</a></p><p class="time-out">已经发送3次验证邮件,如果没有收到邮件,请检查邮箱是否正确,或一小时后重新验证。</p></div>'
		                  + '<p class="notic">如果点击“查看验证邮件”没反应，请自行登录个人邮箱！</p>';
		        	   if (data == '0') {
		        		   $('.pl-50').html(verifyHtmlErr);
		        	   }
		           }
		    });
		});
		
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
		
		//绑定邮箱再次发送验证邮件 1：true  0:false
		$('.bind-email').live('click', function(){
			var dataurl = $('input[name="url"]').val();
			$.ajax({
		           type:'POST',
		           url:base+ '/account/tosendEmail.htm' + "?d=" + new Date().getMilliseconds(),
		           data:{'str':$('input[name="str"]').val(),'style':$('input[name="style"]').val(),'styleTem':'007'},
		           success:function(data){
		        	   var bindHtmlErr = '<div class="clearfix"><p class="btn-default"><a class="btn" href="http://'+dataurl+'" target="_blank">查看验证邮件</a></p><p class="time-out">已经发送3次验证邮件,如果没有收到邮件,请检查邮箱是否正确,或一小时后重新验证。</p></div>';
		        	   if (data == '0') {
		        		   $('.pl-50').html(bindHtmlErr);
		        	   }
		           }
		    });
		});
		
		//修改邮箱再次发送验证邮件 1：true  0:false
		$('.edit-email').live('click', function(){
			var dataurl = $('input[name="url"]').val();
			$.ajax({
		           type:'POST',
		           url:base+ '/account/tosendEmail.htm' + "?d=" + new Date().getMilliseconds(),
		           data:{'str':$('input[name="str"]').val(),'style':$('input[name="style"]').val(),'styleTem':'007'},
		           success:function(data){
		        	   var bindHtmlErr = '<div class="clearfix"><p class="btn-default"><a class="btn" href="http://'+dataurl+'" target="_blank">查看验证邮件</a></p><p class="time-out">已经发送3次验证邮件,如果没有收到邮件,请检查邮箱是否正确,或一小时后重新验证。</p></div>'+ '<p class="notic">如果点击“查看验证邮件”没反应，请自行登录个人邮箱！</p>';
		        	   if (data == '0') {
		        		   $('.pl-50').html(bindHtmlErr);
		        	   }
		           }
		    });
		});
		
		//绑定邮箱错误再次发送验证邮件 1：true  0:false
		$('.edit-email-more').live('click', function(){
			var dataurl = $('input[name="url"]').val();
			$.ajax({
		           type:'POST',
		           url:base+ '/account/tosendEmail.htm' + "?d=" + new Date().getMilliseconds(),
		           data:{'str':$('input[name="str"]').val(),'style':$('input[name="style"]').val(),'styleTem':'007'},
		           success:function(data){
		        	   var bindHtmlErr = '<div class="clearfix"><p class="btn-default"><a class="btn" href="http://'+dataurl+'" target="_blank">查看验证邮件</a></p><p class="time-out">已经发送3次验证邮件,如果没有收到邮件,请检查邮箱是否正确,或一小时后重新验证。</p></div>';
		        	   if (data == '0') {
		        		   $('.pl-50').html(bindHtmlErr);
		        	   }
		           }
		    });
		});
})(jQuery);	


