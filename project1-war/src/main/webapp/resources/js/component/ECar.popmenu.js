/**
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * Author:   许祥成
 * Date:     2013-12-20
 * Description: 下压菜单。
 * 
 */

;(function($,ECar){
	ECar.popMenu = function(targets,option){
	    var def={
	    	handle:">.handle",		//触发元件
	    	content:">.content",	//下拉元件
	    	trigger:"hover",		//触发事件：hover, click
	    	toggleClass:"show"		//显示时的附加class
	    };

	    option=$.extend({},def,option);


	    var items = $(arguments[0]);
	    items.each(function(){
	    	new DropdownMenu(this,option);
	    });
	};
	function DropdownMenu (target,option) {
		this.$elem=
		this.handle=
		this.option=
		this.opened=
		this.content=null;
		this.init(target,option);
	}
	DropdownMenu.prototype.init=function  (target,option) {
		var triggers = option.trigger.split(" ");
		this.$elem=$(target);
		this.option=option;
		this.opened=false;
		this.handle=this.$elem.find(option.handle);
		this.content=this.$elem.find(option.content).css({"position":"absolute","display":"none"});

		for(var i=triggers.length;i--;){
			var trigger=triggers[i];
			if(trigger=="click"){
				this.handle.on("click",$.proxy(toggle,this));
			}else if(trigger=="hover"){
				this.handle.on("mouseenter",$.proxy(this.show,this));
				this.$elem.on("mouseleave",$.proxy(this.hide,this));
			}
		}

	};
	DropdownMenu.prototype.toggle=function () {
		this.opened?this.hide():this.show();
	};
	DropdownMenu.prototype.show=function () {
		this.content.show();
		this.opened=true;
		this.$elem.addClass(this.option.toggleClass);
	};
	DropdownMenu.prototype.hide=function () {
		this.content.hide();
		this.opened=false;
		this.$elem.removeClass(this.option.toggleClass);
	};
}(jQuery,window.ECar||(window.ECar={})));