/**
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * Author:   许祥成
 * Date:     2013-12-20
 * Description: 下拉框。
 * 
 */

;(function($,ECar){
ECar.selector=function(){
	this.init.apply(this,arguments);
	
};
ECar.selector.prototype={
	defaults:{
				dom:null,
				handler:">:first-child",
				label:">:first-child>:first-child",
				dropdown:">:nth-child(2)",
				openClass:"expand",
				selectedClass:"selected"
			},
	init:function(){
		var options=this.options,
			defaults=this.defaults,
			that=this;
		if($.isPlainObject(arguments[0])){
			options=$.extend({},defaults,arguments[0]);
		}else{
			options=$.extend({},defaults,{dom:arguments[0]});
		}
		this.settings=options;
		var dom = this.dom=$(options.dom);
		dom.attr("tabIndex",100);
		this.handler=$(options.handler,dom);
		this.label=$(options.label,dom);
		this.dropdown=$(options.dropdown,dom).hide();
		this.prompt=dom.attr("data-prompt");
		this.options=this.dropdown.find("a");
		this.label.text(this.prompt);
		this.opened=false;
		this.handler.click(function(){
			if(!that.opened){
				$(document.body).trigger("click");
				that.open();
			}
			else{
				that.close();
			}
		});
		dom.click(function(e){
			e.stopPropagation();
		});
		this.dropdown.on("click","a",function(e){
			var t = $(e.currentTarget),sc=that.settings.selectedClass;
			that.dom.find("li."+sc).removeClass(sc);
			t.parent().addClass(sc);
			that.select(t);
			that.close();
			e.preventDefault();
		});
	},
	val:function(){
		if(arguments.length==1){
			var that=this,value=arguments[0];
			this.options.each(function(i,item){
				var tmp=$(item);
				if(tmp.attr("data-value"==value)){
					that.select(tmp);
					return false;
				}
			});
		}
		else{
			return this.dom.attr("data-value");
		}
	},
	select:function(a){
		var valprev=this.dom.attr("data-value"),
			valcur=a.attr("data-id"),
			textprev = this.label.text(),
			textcur=a.text();
		if(valprev==valcur&&textprev==textcur)
			return;
		this.dom.attr("data-value",a.attr("data-id"));
		this.label.text(a.text());
		this.dom.trigger("change");
	},
	open:function(){
		var that=this;
		this.dropdown.slideDown(100);
		this.dom.addClass(this.settings.openClass);
		this.opened=true;
		$(document.body).one("click",function(){
			that.close();
		});
	},
	close:function(){
		if(!this.opened) return;
		this.dropdown.slideUp(100);
		this.dom.removeClass(this.settings.openClass);
		this.opened=false;
	},
	reset:function(){
		this.label.text(this.dom.attr("data-prompt"));
		this.dom.attr("data-value","");
		this.dropdown.find("li").removeClass(this.settings.selectedClass);
	}
};
$.fn.ecarSelector=function(){
	this.each(function(i,item){
		item.selector=new ECar.selector(item);
	});
	return this;
};
})(jQuery,window.ECar||(window.ECar={}));