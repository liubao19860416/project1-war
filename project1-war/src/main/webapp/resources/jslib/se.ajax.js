(function($){
    //工具函数定义 
    var _t = {
            getContextPath: function () {
                var pathName = document.location.pathname;
                var i = pathName.substr(1).indexOf("/");
                return pathName.substr(0, i + 1);
            },
            //初始化ajax配置
            initSettings:function(url,data,succallback){
                 var settings={};
                 //默认ajax配置
                 settings.async=true;
                 settings.type='POST';
                 settings.dataType='json';
                 //初始化
                 settings.url=$.se.context+url;
                 settings.data=data;
                 settings.success=function(result){
                     succallback(result);
                 };
                 return settings;
            }
    };
    //常量定义
    var _c ={
    }
    
   
    $.se = $.se || {};
    
    //有可能之前已经定义的了$.saicExt.context，如果未定义通过_t.getContextPath()来取得
    if($.se.context == undefined) {
        $.se.context = _t.getContextPath();
    };

    $.extend($.se, {
         ajax:function(settings){
                $.ajax(settings);
         },
         post:function(url,data,succallback){
             var settings=_t.initSettings(url,data,succallback);
             settings.type='POST';
             $.se.ajax(settings);
         },
         get:function(url,data,succallback){
             var settings=_t.initSettings(url,data,succallback);
             settings.type='GET';
             $.se.ajax(settings);
         }
         //最后一个方法后不能有逗号，否则IE下 会报错   
    });
    
})(jQuery);