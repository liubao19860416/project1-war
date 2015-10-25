(function($){
     var _t = {
            getContextPath: function () {
                var pathName = document.location.pathname;
                var i = pathName.substr(1).indexOf("/");
                return pathName.substr(0, i + 1);
            },
      
            //初始化ajax配置
            initSettings:function(options){
                 var settings={};
                 //默认ajax配置
                 settings.async=true;
                 settings.type='POST';
                 settings.dataType='json';
                 //初始化
                 if(options.beforeSerialize!=undefined){
                     settings.beforeSerialize=options.before;
                 }
                 if(options.url!=undefined){
                     settings.url=$.se.context+options.url;
                 }
                 if(options.success!=undefined){
                     settings.success=options.success;
                 }
                 if(options.data!=undefined){
                     settings.data = options.data;
                 }
                 return settings;
            }
    };
     $.se = $.se || {};
    //有可能之前已经定义的了$.saicExt.context，如果未定义通过_t.getContextPath()来取得
    if($.se.context == undefined) {
        $.se.context = _t.getContextPath();
    };
   
    $.extend($.se, {
        
         ajaxSubmit:function(formId,options){
             var settings;
             if(options!=undefined&&options!=null){
                 settings = _t.initSettings(options);
             }
             var form = $('#'+formId);
             if(options.data==undefined){
                 settings.data=form.formSerialize();
             }
             form.ajaxSubmit(settings);
         },
         
     });
     
})(jQuery);