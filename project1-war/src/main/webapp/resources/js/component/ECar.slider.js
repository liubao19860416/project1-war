/**
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * Author:   许祥成
 * Date:     2013-12-20
 * Description: 滑动焦点图。
 * 
 */
;(function(){
    
ECar.slider=function(options){
    return new slider(options);
};

function slider(options){
    this.init(options);
}
slider.prototype={
    defaults:{
        wrapper:".c-slider-wrapper",
        items:".c-slider-item",
        pager:".c-slider-pager",
        pagerCurrentClass:"current",
        delay:5000,
        duration:300,
        autoPlay:true
    },
    init:function(options){
        var o={};
        if(typeof options=="string"){
            o.dom=options;
        }else{
            o=options;
        }
        var options = this.options=$.extend({},this.defaults,o);
        var dom = this.dom=$(options.dom);
        this.wrapper=$(options.wrapper,dom);
        this.items=$(options.items,dom).css("float","left");
        this.pager=$(options.pager,dom);
        this.cellWidth=dom.width();
        this.wrapper.width(this.items.length*this.cellWidth);
        this.pager.empty();
        this.current=-1;
        var pagerHtml="";
        for(var i=0;i<this.items.length;){
            pagerHtml+="<li>"+(++i)+"</li>";
        }
        this.pager.html(pagerHtml);
        this.pagerItems=this.pager.find("li");
        this.pager.on("mouseenter","li",(function(that){
            return function(e){
                that.gotoPage($.inArray(e.target,that.pagerItems.toArray()));
            };
        })(this));
        this.gotoPage(0);
        if(options.autoPlay){
            resetPlay(this);
        }
        function resetPlay(_this){
        	_this.play(_this)
            _this.dom.mouseenter(function(){
                _this.stop(_this);
            }).mouseleave(function(){
                _this.play(_this);
            });
        }
    },
    play:function(that){
    	that.playTimer&&clearInterval(that.playTimer);
        that.playTimer=setInterval(function(){
                that.autoNext();
            },that.options.delay);
    },
    stop:function(that){
        clearInterval(that.playTimer);
    },
    autoNext:function(){
        var next = this.current+1;
        if(next>=this.items.length){
            next=0;
        }
        this.gotoPage(next);
    },
    gotoPage:function(index){
        if(this.current==index)return;
        var that=this,prev=this.current,options=that.options;
        this.current=index;
        $(that.pagerItems.get(prev)).removeClass(options.pagerCurrentClass);
        $(that.pagerItems.get(index)).addClass(options.pagerCurrentClass);
        this.wrapper.stop(false,false).animate({left:-index*this.cellWidth},options.duration);
    }
};
    
})(jQuery,window.ECar||(window.ECar={}));