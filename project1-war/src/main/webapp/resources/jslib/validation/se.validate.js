(function($){
     var _t = {
            getContextPath: function () {
                var pathName = document.location.pathname;
                var i = pathName.substr(1).indexOf("/");
                return pathName.substr(0, i + 1);
            },
    };
    //自定义校验方法
    jQuery.validator.addMethod("isString", function(value, element) {       
         return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);       
     }, validator.messages.string);   
   
     $.se = $.se || {};
    //有可能之前已经定义的了$.saicExt.context，如果未定义通过_t.getContextPath()来取得
    if($.se.context == undefined) {
        $.se.context = _t.getContextPath();
    };
   
    $.extend($.se, {
        
         isName:function(elemId){
            
         }
     });
     
})(jQuery);