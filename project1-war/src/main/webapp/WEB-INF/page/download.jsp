<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>保养管家 - 一键预约 汽车保养全搞定</title>
    <meta name="keywords" content="汽车保养管家 下载  安卓 IOS APP 荣威车主  车享 车享网 车享网平台 车享平台 上汽电商 促销活动 汽车经销商 chexiang" />
    <meta name="description" content="" />
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta name="MobileOptimized" content="320">
    
    
    <link rel="stylesheet" type="text/css" href="/resources/css/reset.min.css" />
    <link rel="stylesheet" type="text/css" href="/resources/css/common.min.css" />
<script type="text/javascript">window.base="http://www.chexiang.com";window.accountBase="https://account.chexiang.com";window.mainBase="http://www.chexiang.com"; window.imBase="chexiang"; var orderBase="http://order.chexiang.com";var memberBase="http://member.chexiang.com"; var imUrl="http://kf.chexiang.com/kf.php?arg=admin&style=2";</script>
<link href="/resources/images/favicon.ico" type="image/x-icon" rel="shortcut icon">
<script type="text/javascript" src="/resources/js/jquery_1_8_3.min.js" ></script>
<script>$.ajaxSetup({ cache: false });</script>
<script type="text/javascript" src="/resources/js/index/header.min.js" ></script>
<link rel="stylesheet" type="text/css" href="/resources/css/bygj/main.min.css" />
<link rel="stylesheet" type="text/css" href="/resources/jslib/tipsy/tipsy.min.css" />
<script type="text/javascript" src="/resources/jslib/tipsy/tipsy.min.js" ></script>
    
    
    
    
    
        <style>
        .downs { text-align:center;padding:30px 0;background:#fff;}
        .tabs { height:348px;position:relative;}
        .tabs .m-cnt { display:none;padding-top:1px;}
         input{font-family:"Microsoft Yahei";}
        .ysbtns { 
            text-align: center; 
            background: #383838;
            width:100%;
            height:56px;
            line-height:52px;
            display:block;
            border:none;
            border-radius:4px;
            cursor:pointer;
        }
        .filgren { width: 265px; margin: 0 auto; }
        .filgren .form-group { 
            margin-bottom:15px;
        } 
        .filgren input { height: 24px; line-height: 24px; border: none; background: #fff; width: 100%;  padding: 16px 10px; }
        .filgren .yz input { width: 162px; }
        .tab-tit{font-size:0;border-top:1px solid #ddd;position:absolute;bottom:0;left:0;width:100%;} 
        .tab-tit li { display: inline-block; *display: initial; *zoom: 0; width: 33.333%; font-size: 16px;text-align:center; }
        .tab-tit li a { display:block;height:68px;line-height:68px;border-left:1px solid #ddd;cursor:pointer;}
        .tab-tit li:first-child a { border-left:none;}
        .tab-tit li a:hover, .tab-tit li.hover a { text-decoration: none; background: #e2e2e2; color: #1e98e6; }
    </style>
</head>
<body>
    <div class="head">
        <a class="logo" href="http://www.chexiang.com/index.htm"><img src="/resources/images/bygj/logo.png"/></a>
    </div>
    
    <div class="slider">
        <div class="inner">
            <div class="hand" style=""><img src="/resources/images/bygj/hand.png" /></div>
            <div class="down-btn">
                <div class="down-btn-title"></div>
                <div class="tabs">
              

                    <div class="m-cnt" style="display:block;">
                      <form id="loginForm" action="" method="post" autocomplete="off">
                        <div class="down-btn-box row">
                            <div class="filgren" style="margin-top:40px;">
                                <div class="form-group">
                                    <input type="text" id="phoneNo" name="phoneNo"  maxlength="11" original-title="" placeholder="请输入手机号" onkeypress="cl()" />
                                </div>
                                <div class="form-group yz">
                                    <input type="text"id="checkCode" name="checkCode" original-title=""   maxlength="4"  placeholder="请输入验证码" />
                                   <img src="/bygj/validateCode.htm" id="imgCode"style="cursor:pointer;" onclick="chageCodeImage('imgCode');" width="75px" height="55" alt="" border="0">
                                </div>
                                <div class="form-group">
                                    <span onclick="submitFrom()" class="ysbtns">
                                        <img src="/resources/images/bygj/btns.jpg" />
                                    </span>
                                    <p id="info" class="txt" style="color:#FEAE05">
                            
                                </p>
                                </div>
                                
                                
                            </div>
                        </div>
                        </form>
                    </div>
                    <div class="m-cnt">
                     <div class="filgren" style="margin-top:70px;">
                        <img class="weixin" src="/resources/images/bygj/weixin.png" />
                        </div>
                    </div>
                    <div class="m-cnt">
                        <div class="down-btn-box row" style="margin-top:80px;">
                            <div class="col-md-5 down-next">
                                <a class="btn" href="https://itunes.apple.com/cn/app/bao-yang-guan-jia/id902254180?mt=8"></a>
                                <p class="txt">
                                    适用：IOS7.0以上
                                </p>
                            </div>
                            <div class="col-md-5 down-now">
                                <a href="http://download.cximg.com/apps/android/W0000001bygj.apk" class="btn"></a>
                                <p class="txt">
                                    适用：Android 4.0或以上
                                </p>
                            </div>
                        </div>
                    </div>
                    <ul class="tab-tit clearfix">
                        <li class="hover"><a>短信下载</a></li>
                        <li><a>二维码下载</a></li>
                        <li><a>直接下载</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <script>
    /**
 * jQuery EnPlaceholder plug
 * EnPlaceholder
 * version 1.0
 * by lixiaolong
 */
;(function ($) {
    $.fn.extend({
        "placeholder":function (options) {
            options = $.extend({
                placeholderColor:'#ACA899',
                isUseSpan:false, //
                onInput:true  //
            }, options);
			
            $(this).each(function () {
                var _this = this;
                var supportPlaceholder = 'placeholder' in document.createElement('input');
                if (!supportPlaceholder) {
                    var defaultValue = $(_this).attr('placeholder');
                    var defaultColor = $(_this).css('color');
                    if (options.isUseSpan == false) {
                        $(_this).focus(function () {
                            var pattern = new RegExp("^" + defaultValue + "$|^$");
                            pattern.test($(_this).val()) && $(_this).val('').css('color', defaultColor);
                        }).blur(function () {
                                if ($(_this).val() == defaultValue) {
                                    $(_this).css('color', defaultColor);
                                } else if ($(_this).val().length == 0) {
                                    $(_this).val(defaultValue).css('color', options.placeholderColor)
                                }
                            }).trigger('blur');
                    } else {
                        var $imitate = $('<span class="wrap-placeholder" style="position:absolute; display:inline-block; overflow:hidden; color:'+options.placeholderColor+'; width:'+$(_this).outerWidth()+'px; height:'+$(_this).outerHeight()+'px;">' + defaultValue + '</span>');
                        $imitate.css({
                            'margin-left':$(_this).css('margin-left'),
                            'margin-top':$(_this).css('margin-top'),
                            'font-size':$(_this).css('font-size'),
                            'font-family':$(_this).css('font-family'),
                            'font-weight':$(_this).css('font-weight'),
                            'padding-left':parseInt($(_this).css('padding-left')) + 2 + 'px',
                            'line-height':_this.nodeName.toLowerCase() == 'textarea' ? $(_this).css('line-weight') : $(_this).outerHeight() + 'px',
                            'padding-top':_this.nodeName.toLowerCase() == 'textarea' ? parseInt($(_this).css('padding-top')) + 2 : 0
                        });
                        $(_this).before($imitate.click(function () {
                            $(_this).trigger('focus');
                        }));

                        $(_this).val().length != 0 && $imitate.hide();

                        if (options.onInput) {
                            //缁戝畾oninput/onpropertychange浜嬩欢
                            var inputChangeEvent = typeof(_this.oninput) == 'object' ? 'input' : 'propertychange';
                            $(_this).bind(inputChangeEvent, function () {
                                $imitate[0].style.display = $(_this).val().length != 0 ? 'none' : 'inline-block';
                            });
                        } else {
                            $(_this).focus(function () {
                                $imitate.hide();
                            }).blur(function () {
                                    /^$/.test($(_this).val()) && $imitate.show();
                                });
                        }
                    }
                }
            });
            return this;
        }
    });
})(jQuery);
$(function(){
//通过value模拟placeholder
$('input').placeholder();
})
       function submitFrom(){
     
    
      if(validatemobile($("#phoneNo").val())){
    
         $("#phoneNo").tipsy("hide");
         
         if($.trim($("#checkCode").val())==""){
           $("#checkCode").attr("original-title","请输入验证码！")
            $("#checkCode").tipsy("show"); 
            return false;
         }else if($.trim($("#checkCode").val()).length<4){
          $("#checkCode").attr("original-title","请输入验有效的证码！")
            $("#checkCode").tipsy("show"); 
            return false;
         }
         
         else{
          $("#checkCode").tipsy("hide");
          var c ="checkCode="+$("#checkCode").val();
          $.ajax({
		     type: "POST",
		    url: "/bygj/bygjCheck.htm",
		    data: c,
		    success: function(msg){
		    if(msg=="0"){
		      var g ="phoneNo="+$("#phoneNo").val();
					     $.ajax({
					    type: "POST",
					    url: "/bygj/sendMessage.htm",
					    data: g,
					    success: function(msg){
					    if(msg=="0"){
					   
					    chageCodeImage('imgCode');
					    $("#checkCode").val("");
					    $("#phoneNo").val("");
					      $("#info").empty();
					    $("#info").append("短信已经发送，请注意查收")
					   }else{
					     chageCodeImage('imgCode');
					     $("#checkCode").val("");
					      $("#info").append("发送失败，请重试")
					   }
					}
		    });
		   
		    }else{
      $("#checkCode").attr("original-title","验证码不正确！")
            $("#checkCode").tipsy("show"); 
    }
   }
});
         }
         }
     
       }
       function validatemobile(mobile)
    {
     
        if(mobile.length==0)
        {
         
            $("#phoneNo").attr("original-title","请输入手机号码！")
            $("#phoneNo").tipsy("show"); 
            return false;
         
           
        }    
        if(mobile.length!=11)
        {  
            $("#phoneNo").attr("original-title","请输入有效的手机号码！")
            $("#phoneNo").tipsy("show"); 
            return false;
        }
        
        var myreg = /^1[3548]\d{9}$/;
        if(!myreg.test(mobile))
        {  
             $("#phoneNo").attr("original-title","请输入有效的手机号码！")
            $("#phoneNo").tipsy("show"); 
            return false;
        }
         return true;
    }
        $(function () {
       $("#phoneNo").tipsy({trigger: 'manual',gravity: 's'});
        $("#checkCode").tipsy({trigger: 'manual',gravity: 's'});
        
        window.chageCodeImage = function (id){
		document.getElementById(id).src = "/bygj/validateCode.htm?d=" + new Date().getTime();
	};
	
            ints();
            function ints() {
                $(".tabs").each(function () {
                    var ta = $(this).find(".tab-tit");
                    var tc = $(this).find(".m-cnt");
                    ta.find("li").click(function () {
                        var cmp = $(this).index()
                        ta.find("li").removeClass("hover");
                        $(this).addClass("hover");
                        tc.hide();
                        $(tc).eq(cmp).show();
                    });
                });
            }
        })
        function cl(){
           $("#info").empty()
        }
        function clicks(url){
            window.open(url)
        }
    </script>
    
    <div class="downs">
   
        <img src="/resources/images/bygj/dow.png" usemap="#Map" />
    <map name="Map">
        <area shape="rect" coords="1,33,197,82" href="javascript:clicks('http://shouji.baidu.com/soft/item?docid=7067776')">
        <area shape="rect" coords="306,29,469,91" href="javascript:clicks('http://apk.91.com/Soft/Android/com.saike.android.grape-1-1.0.0.html')">
        <area shape="rect" coords="600,28,722,81" href="javascript:clicks('http://apk.gfan.com/Product/App901154.html')">
        <area shape="rect" coords="851,32,960,80" href="javascript:clicks('http://www.anzhi.com/soft_1754809.html')">
        <area shape="rect" coords="1,122,157,183" href="javascript:clicks('http://zhushou.360.cn/detail/index/soft_id/1893547')">
        <area shape="rect" coords="303,121,499,182" href="javascript:clicks('http://app.mi.com/detail/68337')">
        <area shape="rect" coords="599,119,758,184" href="javascript:clicks('http://app.lenovo.com/app/15194287.html')">
        <area shape="rect" coords="842,118,1079,186" href="javascript:clicks('http://app.taobao.com/software/detail.htm?appID=6632832')">
        <area shape="rect" coords="1,214,121,254" href="javascript:clicks('http://android.myapp.com/myapp/detail.htm?apkName=com.saike.android.grape')">
        <area shape="rect" coords="303,206,463,265" href="javascript:clicks('http://apk.hiapk.com/appinfo/com.saike.android.grape')">
    </map>

</div>
    <div class="content">
        <div class="column view" style="">
            <div class="inner2">
                <div class="middle">
                    <ul>
                        <li>
                            <h3>在线预约  保养零等待</h3>
                            <h4>时间地点随您挑选  无需排队 <br />到店第一时间上工位</h4>
                        </li>
                        <li>
                            <h3>工时折扣  优惠专享</h3>
                            <h4>
                                超低闲时折扣  免费项目赠送<br />只有通过管家预约才可享受
                            </h4>
                        </li>
                        <li>
                            <h3>专业指导  价格透明</h3>
                            <h4>
                                生动的保养说明  彻底解决您的保养困惑<br />
                                保养项目自主选择，消费省心放心
                            </h4>
                        </li>
                        <li>
                            <h3>品质保证  贴心服务</h3>
                            <h4>
                                4S店专人接待  400电话随时为您服务<br />
                                严选4S店确保服务品质
                            </h4>
                        </li>
                    </ul>

                </div>
            </div>

            <!---->
        </div>

    </div>

    </div>
    <div class="foot">
        <div class="foot-icon">
            <img src="/resources/images/bygj/foot-icon.png"/>
        </div>
        <div class="copyright">
            <p>
                CopyRight © 2013-2014, All Rights Reserved版权所有 车享<br />
                沪ICP备14000481
            </p>
        </div>
    </div>
    
    <script>
  //GA检测代码
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-48109728-1', 'chexiang.com',{'cookieDomain':'none'});
   ga('send', 'pageview');


//baidu检测代码
//var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
//document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Ff8ba65b380f665911ecab4df90bfe056' type='text/javascript'%3E%3C/script%3E"));
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?f8ba65b380f665911ecab4df90bfe056";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
    
</body>
</html>