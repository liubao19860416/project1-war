/**
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * Author:   许祥成
 * Date:     2013-12-20
 * Description: 表单验证。
 * 
 * 需要验证的表单元件如select,input之类加上自定义属性，当前支持的验证有：
 * 属性名称				值				描述
 * data-required		true/false		必填（选）
 * data-msg-required	string			必选项为空时的提示
 * data-length-min		int				最小长度
 * data-msg-length-min	string			小于最小长度的提示
 * data-regexp			regexp string	正则匹配
 * data-msg-regexp		string			不符合正则时的提示
 * data-remote			string			远程验证的地址
 * data-msg-remote		string			远程验证返回false时的提示
 */
;(function($,ECar){
	/**
	 * @params form dom或selector
	 * 			options 可选 
	 */
ECar.validate=function(){
    var options={};
	options.form=$(arguments[0]);
    if(arguments.length==2){
    	options = $.extend(this.defaults,options,arguments[1]);
    }
    this.init(options);
};
ECar.validate.prototype={
	defaults:{
		submit:function(){			//完成后的提交动作
			this.form[0].submit();
		},
		fail:$.noop//验证失败的回调
	},
	init:function(options){
		var options = this.options=options,
			form=this.form=options.form,that=this,
			items =this.items=[];
		$("input,select,textarea",form).each(function(){
			items.push(new ValidateItem(this));
		});
		form.bind("submit",(function(o){
			return function(e){
			//if(form.data("valid"))return;
				e.preventDefault();
				e.stopImmediatePropagation();
				that.valid().done(function(){
					if(o.options.submit.call(o,o.form)!==false){ 
						o.form[0].submit();
					}
				}).fail(function(){
					var errtip=o.form.find(".m-err:visible:first");
					if(errtip.length>0
							&&(
									errtip.offset().top+errtip.height()<$(window).scrollTop()
									||errtip.offset().top>$(window).scrollTop()+$(window).height()
									)){
						$(window).scrollTop(errtip.offset().top-10);
					}
					o.options.fail.call(o,o.form);
				});
			};
		})(this));
	},
	valid:function(){
		var dfs = [];
		$.each(this.items,function(){
			dfs=dfs.concat(this.valid());
		});
		return $.when.apply($,dfs);
	}
};
ECar.validate.ValidateItem = ValidateItem;
function ValidateItem(item){
	var rules=this.rules=[],that=this,
		item=this.item=$(item),
		msgContainer=this.msgContainer=$("[data-msg-for="+item.attr("id")+"]");
	if(msgContainer.text().length>0)msgContainer.parent().show();
	if(item.data("required")){
		rules.push(new Rule({
			name:"required",
			element:item,
			errorMsg:item.data("msgRequired")
		}));
	}
	if(item.data("lengthMin")){
		rules.push(new Rule({
			name:"lengthMin",
			element:item,
			errorMsg:item.data("msgLengthMin"),
			lengthMin:parseInt(item.data("lengthMin"))||0
		}));
	}
	if(item.data("regexp")){
		rules.push(new Rule({
			name:"regexp",
			element:item,
			errorMsg:item.data("msgRegexp"),
			regexp:item.data("regexp")
		}));
	}
	if(item.data("remote")){
		rules.push(new Rule({
			name:"remote",
			element:item,
			errorMsg:item.data("msgRemote"),
			url:item.data("remote"),
			params:item.data("remoteParams")
		}));
	}
	var listenTo="validate ";
	if(item.is("select,input:radio,input:checkbox,input:hidden")){
		listenTo+=" change";
	}else if(item.is("input:text,input:password")){
		listenTo+="blur";
	}
	item.bind(listenTo,function(){
		//$(this).parent("form:eq(0)").data("valid",false);
		setTimeout(function(){
			that.valid();
		},100);
	});
}
ValidateItem.prototype={
	valid:function(){
		var dArr = [],that=this;
		this.msgContainer.empty().parent().hide();
		$.each(this.rules,function(){
			var v=this.valid(),rule=this;
			dArr.push(v);
			$.when(v).fail(function(){
				that.showError(rule.errorMsg);
				v=false;
			});
			return v;
		});
		return dArr;
	},
	showError:function(msg){
		this.msgContainer.text(msg).parent().show();
	}
};
function Rule(params){
	this.init(params);
}
Rule.prototype={
	init:function(params){
		for(var i in params){
			this[i]=params[i];
		}
	},
	valid:function(){
		return this.method[this.name].call(this);
	},
	method:{
		required:function(){
			var $ele =$(this.element),df=$.Deferred();
			if($ele.is(":text,:password,input[type=hidden]")){
				$.trim($ele.val()).length>0?df.resolve():df.reject();
			}else if($ele[0].nodeName.toLowerCase()==="select"){
				var val=$ele.val();
				val&&val!=="0"?df.resolve():df.reject();
			}else if($ele.is(":radio,:checkbox")){
				$("input[name="+$ele.attr("name")+"]:checked").length>0?df.resolve():df.reject();
			}else{
				df.resolve();
			}
			return df;
		},
		regexp:function(){
			var $ele=this.element,regexp=this.regexp,df=$.Deferred();
			(new RegExp(regexp)).test($ele.val())?df.resolve():df.reject();
			return df;
		},
		lengthMin:function(){
			var $ele=this.element,lengthMin=this.lengthMin,df=$.Deferred();
			this.lengthMin<=$.trim($ele.val()).length?df.resolve():df.reject();
			return df;
		},
		remote:function(){
			var $ele =$(this.element),df=$.Deferred(),
				url = this.url,
				params=(function(){
					var ret={};
					ret[$ele.attr("name")]=$ele.val();
					$(this.params).each(function(){
						ret[this.name]=$(this).val();
					});
					return ret;
				})(),
				xhr = this.xhr,
				timer=this.timer,
				that=this;
			if(timer){
				clearTimeout(timer);
				delete this.timer;
			}
			if(xhr){
				xhr.abort();
			}
			this.timer=setTimeout(function(){
				that.xhr = $.getJSON(url,params,function(data){
					if(data){
						df.resolve();
					}else{
						df.reject();
					}
				});
			},300);
			return df;
		}
	}
};

})(jQuery,window.ECar||(window.ECar={}));