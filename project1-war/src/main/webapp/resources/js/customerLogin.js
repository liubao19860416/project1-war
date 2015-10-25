;(function(){

	window.chageCodeImage = function (id){
		document.getElementById(id).src = base+"/account/validateCode.htm?d=" + new Date().getTime();
	};
	var rule = {
			basicRule: /^[a-zA-Z0-9@]*$/,
			mobile: /^1[3,4,5,7,8]\d{9}$/,
			onlyNum: /^[0-9]*$/,
			email: /^[0-9a-zA-Z][_.0-9A-Za-z-]{0,31}@([0-9A-Za-z][0-9A-Za-z-]{0,30}\.){1,4}[A-Za-z]{2,4}$/
		};
	
	$(function(){
	
		$('#loginForm').submit(function(e){
			
		if($('#submit').val()=='登录中...') return false;		
		
			var uValue = $("#username").val();
			var pValue = $("#passwd").val();
			var codeValue = $("#identcode").val();		
			var flag = true;
	        $('.m-notice').remove();
		
			if(pValue=="" || uValue=="" ){
				var $tag = $('<p class="errtxt"><span class="m-notice m-err error"><i></i><span>不要心急哟，账号或密码还空着呐！</span></span></p>');
				$(".login-inner").find("h1").after($tag);
				flag=false;
			}else if(codeValue==""){
				var $tag = $('<p class="errtxt"><span class="m-notice m-err error"><i></i><span>哎呀，验证码还空着呐！</span></span></p>');
				$(".login-inner").find("h1").after($tag);
				flag=false;
			}else if (uValue.match(rule.mobile)) {
			} else if (rule.email.test(uValue)) {
			} else if (!(rule.basicRule.test(uValue))) {
				var $tag = $('<p class="errtxt"><span class="m-notice m-err error"><i></i><span>账号只可以用数字和字母喔！</span></span></p>');
				$(".login-inner").find("h1").after($tag);
				flag=false;
				//showWrongMsg("用户名只可以用数字和字母喔");
			} else if (uValue.length < 6 || uValue.length > 20) {
				var $tag = $('<p class="errtxt"><span class="m-notice m-err error"><i></i><span>账号需要6-20位长哟！</span></span></p>');
				$(".login-inner").find("h1").after($tag);
				flag=false;
				//showWrongMsg("账号需要6-20位长哟");
			} else if (rule.onlyNum.test(uValue) && !rule.mobile.test(uValue)) {
				var $tag = $('<p class="errtxt"><span class="m-notice m-err error"><i></i><span>账号不能是纯数字，请确认输入的是手机号或者重新输入！</span></span></p>');
				$(".login-inner").find("h1").after($tag);
				flag=false;
				//showWrongMsg("用户名不能是纯数字，请确认输入的是手机号或者重新输入");
			} else if (uValue.indexOf("@") !== -1 && !rule.email.test(uValue)) {
				var $tag = $('<p class="errtxt"><span class="m-notice m-err error"><i></i><span>您输入的邮箱地址有误喔，检查一下吧！</span></span></p>');
				$(".login-inner").find("h1").after($tag);
				flag=false;
				//showWrongMsg("您输入的邮箱地址有误喔，检查一下吧");
			} 
			
			if(!flag){
				e.preventDefault();
			}else{
				$('#submit').val('登录中...');
			}
		});
		
		ECar.placeholder($("input[placeholder],textarea[placeholder]"));
		
	});

	//绿色标签    
    $('#remeberme').toggle(function(){
    	$(this).addClass('ticks');
    	$('#ifRemenberMe').attr('checked',true);
    },function(){
        $(this).removeClass('ticks');
    	$('#ifRemenberMe').attr('checked',false); 

    }); 

    
    $(".password").toggle(function(){
    	$('#remeberme').click();    	
    },function(){    	
    	$('#remeberme').click();
    });
    
})();;