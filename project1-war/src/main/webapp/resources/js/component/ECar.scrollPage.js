/**
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * Author:   许祥成
 * Date:     2013-12-20
 * Description: 页面滚动。
 * 
 */
;(function($,ECar){

/**
 * 页面滚动
 * @param target        目标位置，锚点的name或高度数值
 * @param duration      缓动时间，毫秒
 * @param onComplete    完成时的callback，function
 */
ECar.scrollPage = function (target,duration,onComplete){
    var def={
        target: "",
        duration: 300,
        onComplete: $.noop()
        },
        args={},
        $body=(window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
        top;
    if($.isFunction(duration)){
        onComplete=duration;
        duration=undefined;
    }
    args= $.extend({},def,{target:target,duration:duration,onComplete:onComplete});

    if(/^[\d,\.]+$/.test(target)){
        top=parseInt(target);
    }else{
        top=$("a[name="+target+"]").offset().top;
    }
    $body.animate({scrollTop:top},args.duration,args.onComplete);
};
})(jQuery,window.ECar||(window.ECar={}));