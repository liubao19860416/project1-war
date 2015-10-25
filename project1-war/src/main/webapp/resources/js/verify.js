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
		ECar.tab({
			selector : "#tab",
			selected:"current"
		});
		
		ECar.validate.init({
			formid:'ver-mobile'
		});

		ECar.validate.init({
			formid:'ver-mail'
		});
		
		var checkYzmCode=function(e,formid,value,checkcode,typeId){
			$form=$('#'+formid);			
			$.ajax({
				type:'POST',
				   url:base+ '/account/tocheckCodeTrueorFa.htm' + "?d=" + new Date().getMilliseconds(),
				   data:{'Num':value,'checkCode':checkcode,'typeId':typeId},
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

		
		$('#ver-mail .btnEmail').click(function(){
			var $form=$('#ver-mail');	
			if(ECar.validate.init.submit('ver-mail')){
				$form.submit();				
			}else{
				return false;
			}
		});

		//手机，邮箱60秒验证
		$('#ver-mobile .getcode,#mobileVerify .getcode,#mailVerify .getcode,#fillmobile .getcode,#bind-new-mobile .getcode,#findPassmobile .getcode').live('click',function(){
			$('[validate="phone"]').focus().blur();
			var pvalue=$('[validate="phone"]').val();
			if($('.phonetxt:visible').size()>0||pvalue=='')return;	
			var value;
			var temStyle;
			var $this=$(this);
			var formid=$(this).parents('form').attr('id');			
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
		
		/***
		$('#form1 .getcode,#form2 .getcode').live('click',function(){		
			var $this=$(this);
			var value=$("#tel").val();
			if($(this).hasClass('getcode-gray'))return;			
			$this.addClass('getcode-gray').css('cursor','default');
			sendCode(value,$this);
		});
		***/
		function sendCode(val,temStyle,obj,typeId){
			$.ajax({
				   type:'POST',
				   url:base+ '/account/toGetPhoneCode.htm' + "?d=" + new Date().getMilliseconds(),
				   data:{'Num':val,'temStyle':temStyle,'typeId':typeId},
				   success:function(data){
					   if(data!=0){
						  
						   $('[validate="phone"]').removeClass('m-member-focus').addClass('m-member-orange');
						   obj.removeClass('getcode-gray');						   
						   if($('[validate="phone"]').parent().find('.errclass').size()>0){
							   $('[validate="phone"]').parent().find('.errclass').show().html('<i></i>'+(data==1?'您输入的手机号已存在，请重新输入!':'请勿重复绑定旧手机，请重新输入!')+'</span>'); 
						   }else{
							   $('[validate="phone"]').parent().append('<span class="phonetxt m-notice m-err errclass"><i></i>'+(data==1?'您输入的手机号已存在，请重新输入!':'请勿重复绑定旧手机，请重新输入!')+'</span>');
						   }
						   return;
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
		
		
		/*zhuozegang*/
		//(修改邮箱-手机验证)
		ECar.validate.init({
	      formid:'modifyemail'
	    });

	    $('#modifyemail .btn').click(function(e){
			var email = $('#email').val();
			var checkCode = $("input[validate='yzm']").val();
			if(ECar.validate.init.submit('modifyemail')){
				checkYzmCode(e,'modifyemail',email,checkCode,2);
			}
	    });
	    
	    
	    
	    //绑定手机(邮箱登陆)
	    ECar.validate.init({
	        formid:'bind-email-loginpaswd'
	      });

	    $('#bind-email-loginpaswd .btn').click(function(e){
			var email = $('#email').val();
			var checkCode = $("input[validate='yzm']").val();
			if(ECar.validate.init.submit('bind-email-loginpaswd')){
				checkYzmCode(e,'bind-email-loginpaswd',email,checkCode,2);
			}
	    });

	    //绑定手机(密码登陆)
	    ECar.validate.init({
	        formid:'bind-pass-loginpaswd'
	      });
	    $('#bind-pass-loginpaswd .btn').click(function(e){
	    	$form=$('#'+'bind-pass-loginpaswd');
	    	$form.submit();
	    });
	    
	    
	    //绑定邮箱(用密码)
	    ECar.validate.init({
	        formid:'bind-mobile-loginPhonepaswd'
	      });

	    $('#bind-mobile-loginPhonepaswd .btn').click(function(e){
	    	$form.submit();
	    });
	    
	    
	    //绑定邮箱(用手机)
	    ECar.validate.init({
	        formid:'bind-mobile-loginpaswd'
	      });

	    $('#bind-mobile-loginpaswd .btn').click(function(e){
			var mobile = $('#mobile').val();
			var checkCode = $("input[validate='yzm']").val();
			if(ECar.validate.init.submit('bind-mobile-loginpaswd')){
				checkYzmCode(e,'bind-mobile-loginpaswd',mobile,checkCode,1);
			}
	    });
	   
	    
	    //修改手机
		ECar.validate.init({
	      formid:'modifymobile'
	    });

		 $('#modifymobile .btn').click(function(e){
				var mobile = $('#mobile').val();
				var checkCode = $("input[validate='yzm']").val();
				if(ECar.validate.init.submit('modifymobile')){
					checkYzmCode(e,'modifymobile',mobile,checkCode,1);
				}
		  });
		 
		 
	    
		//修改密码 (手机验证)
		ECar.validate.init({
		      formid:'accountSeruitymobile'
		      
	    });
		 $('#accountSeruitymobile .btn').click(function(e){
				var mobile = $('#mobile').val();
				var checkCode = $("input[validate='yzm']").val();

				if(ECar.validate.init.submit('accountSeruitymobile')){
					checkYzmCode(e,'accountSeruitymobile',mobile,checkCode,1);
				}
		  });
		     
		 
		//修改密码密保 手机验证
		    ECar.validate.init({
		        formid:'modifymobile_upd'
		      });

		    $('#modifymobile_upd .btn').click(function(e){
				var mobile = $('#mobile').val();
				var checkCode = $("input[validate='yzm']").val();
				if(ECar.validate.init.submit('modifymobile_upd')){
					checkYzmCode(e,'modifymobile_upd',mobile,checkCode,1);
				}
		    });
		 
		 
		 
		//修改密码(邮箱验证)
	    ECar.validate.init({
	      formid:'accoutSeruityemail'
	    });

	    $('#accoutSeruityemail .btn').click(function(e){
			var email = $('#email').val();
			var checkCode = $("#indentycode2").val();

			if(ECar.validate.init.submit('accoutSeruityemail')){
				checkYzmCode(e,'accoutSeruityemail',email,checkCode,2);
			}
	  });
	    
	    
	    
	  //修改密码(只验证邮箱)
	    ECar.validate.init({
	      formid:'modifyemail_updatePass'
	    });

	    $('#modifyemail_updatePass .btn').click(function(e){
			var email = $('#email').val();
			var checkCode = $("input[validate='yzm']").val();

			if(ECar.validate.init.submit('modifyemail_updatePass')){
				checkYzmCode(e,'modifyemail_updatePass',email,checkCode,2);
			}
	  });
	    
	    
	  //找回密码(手机)  
	   ECar.validate.init({
	      formid:'findPassmobile'
	    });

	   $('#findPassmobile .btn').click(function(e){
			var mobile = $('#mobile').val();
			var checkCode = $("input[validate='yzm']").val();

			if(ECar.validate.init.submit('findPassmobile')){
				checkYzmCode(e,'findPassmobile',mobile,checkCode,1);
			}
	  });
	   
	   
	   
	   //找回密码邮箱验证
	    ECar.validate.init({
	      formid:'findPassemail'
	    });

	    $('#findPassemail .btn').click(function(e){
			var email = $('#email').val();

			$form=$('#findPassemail');
			
			//邮箱找回
			$.ajax({
				type:'POST',
				   url:base+ '/account/findPassWord/findPassByEmail.htm' + "?d=" + new Date().getMilliseconds(),
				   data:{'email':email,'typeId':2},
				   success:function(data){
//					   var obj = eval("("+data+")");
//					  alert(obj.registerWebsit);
//					  alert(obj.msg);
					   $form.parent().html(data);
				   }
			});
	    });
	    
	    
	  //修改密报手机验证
		ECar.validate.init({
	      formid:'mobileVerify'
	    });

		 $('#mobileVerify .btn').click(function(e){
				var mobile = $('#mobile').val();
				var checkCode = $("input[validate='yzm']").val();

				if(ECar.validate.init.submit('mobileVerify')){
					checkYzmCode(e,'mobileVerify',mobile,checkCode,1);
				}
		  });  
		 
		//修改密报邮箱验证
		    ECar.validate.init({
		      formid:'emailVerify'
		    });

		    $('#emailVerify .btn').click(function(e){
				var email = $('#email').val();
				var checkCode = $("#indentycode2").val();

				if(ECar.validate.init.submit('emailVerify')){
					checkYzmCode(e,'emailVerify',email,checkCode,2);
				}
		  });
		    
})(jQuery);