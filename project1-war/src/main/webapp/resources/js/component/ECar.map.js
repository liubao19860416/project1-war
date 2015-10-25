/**
 * Copyright (C), 2013-2013, 上海汽车集团股份有限公司
 * Author:   许祥成
 * Date:     2013-12-20
 * Description: 百度地图
 * 
 */ 

;(function($,ECar,window,undefined){
	if(!window.BMap){
		window.BMap=function(){};
		BMap.loaded=false;
		window.BMap.Map= window.BMap.Point=$.noop;
		window.BMap.Map.setViewport=$.noop;
	}
	/**
	 * @params id 容器ID，
	 * 			viewport 数组[经度，纬度]或中心点Point
	 */
	ECar.map = function(id,viewport){
		var map;
		if(BMap.loaded!==false){
			map=this.instance=new BMap.Map(id,{enableMapClick:false});	
		}else{
			map=this.instance=null;
			return;
		}
		if($.isArray(viewport)){
			this.setViewport(viewport);									//
		}
		else{
			this.centerAndZoom(viewport, 11);
		}
		map.addControl(new BMap.NavigationControl());  				//添加默认缩放平移控件	
		map.enableScrollWheelZoom(true);							//启用滚轮缩放
		this.overlays=[];
		this.currentOverlay=null;
		
	};
	ECar.map.prototype={
			/**
			 * 绑定经销商信息
			 * @param data 经销商数据
			 * @param showDealerCallback 显示数据后的加高，返回名片中的html
			 */
		bindDealers:function(data,showDealerCallback){
			if(!this.instance)return;
			var map=this.instance,that=this;
			this.overlays=[];
			map.clearOverlays();
			$(data).each(function(i,dealer){
				var overlay=new DealerMapOverlay(dealer,showDealerCallback||$.noop);
				that.overlays.push(overlay);
				map.addOverlay(overlay);
			});
		},
		/**
		 * 清除经销商信息
		 */
		clearDealers:function(){
			if(!this.instance)return;
			this.instance.clearOverlays();
		},
		/**
		 * 居中了指定经纬，并缩放至zoom
		 * @param lng
		 * @param lat
		 * @param zoom
		 */
		centerAndZoom:function(lng,lat,zoom){
			if(!this.instance)return;
			if(arguments.length==3)
				this.instance.centerAndZoom(new BMap.Point(lng,lat), zoom);
			else if(arguments.length==2)
				this.instance.centerAndZoom(arguments[0], arguments[1]);
				
		},
		/**
		 * 设置窗口位置
		 * @param viewport [左上角经度，左上角纬度，右下角经度，右下角纬度]
		 */
		setViewport:function(viewport){
			if(!this.instance)return;
			viewport[0].lng-=0.001;
			viewport[0].lat-=0.001;
			viewport[1].lng+=0.001;
			viewport[1].lat+=0.001;
			this.instance.setViewport(viewport);
		},
		/**
		 * 显示经销商
		 * @param index 经销商索引
		 */
		showDealer:function(index){
			if(!this.instance)return;
			if(this.currentOverlay){
				this.currentOverlay.hideDetail();
			}
			this.currentOverlay=this.overlays[index];
			this.overlays[index].showDetail();
		},
        /**
         * 选择经销商
         * @param index 经销商索引
         */
        selectDealer:function(index,selected){
            if(!this.instance)return;
            if(this.currentOverlay){
                this.currentOverlay.selected(false);
            }
            this.currentOverlay=this.overlays[index];
            this.overlays[index].selected(selected);
        },
		/**
		 * 隐藏经销商
		 * @param index 经销商索引
		 */
		hideDealer:function(index){
			if(!this.instance)return;
			this.currentOverlay=null;
		}
	};
	/**
	 * 经销商名片浮层
	 */
	function DealerMapOverlay(dealer,showDealerCallback){
		this.data=dealer;
		this.map=null;
		this.isCurrent=false;
		this.infoWin=null;
		this.div=null;
		this.showDealerCallback=showDealerCallback;
	}
	try{

		//继承于地图Overlay
		DealerMapOverlay.prototype=new BMap.Overlay();
		DealerMapOverlay.prototype.initialize=function(map){
			var that=this;
			this.map=map;
			var div = $("<div>").addClass("c-dealer-mapitem");
			$("<div>").addClass("c-dealer-mapitem-arrow").appendTo(div).hover(function(){
				$(this).addClass("c-dealer-mapitem-arrow-hover");
			},function(){
				$(this).removeClass("c-dealer-mapitem-arrow-hover");
			}).click(function(){
				$(window).trigger({type:"dealer.click",index:that.data.index,item:that.data});
			});
			map.getPanes().labelPane.appendChild(div[0]);
			this.div=div[0];
			return div[0];
		};
		DealerMapOverlay.prototype.draw=function(){
			var map=this.map;
			var pixel=map.pointToOverlayPixel(new BMap.Point(this.data.longitude,this.data.latitude));
			$(this.div).css({
				left:pixel.x,
				top:pixel.y
			});
		};
		DealerMapOverlay.prototype.showDetail=function(){
			if(!this.infoWin){
				var that=this;
				this.infoWin=$("<div>").addClass("c-dealer-map-infowin").appendTo(this.div);
				this.infoContent=$("<div>").addClass("c-dealer-map-infowin-content").appendTo(this.infoWin);
				var data=this.data,
					html=this.showDealerCallback.call(this,data);
				$(html).appendTo(this.infoContent);
				$("<div>").addClass("c-dealer-map-infowin-narrow").appendTo(this.infoWin);
				$("<div>").addClass("c-dealer-map-infowin-close").appendTo(this.infoWin).click(function(){
					$(window).trigger({type:"dealer.hide",index:that.data.index});
					that.hideDetail();
				});
			}
			//偏移浮层
			var  pixel = this.map.pointToPixel(new BMap.Point(this.data.longitude,this.data.latitude));
			pixel.x+=100;
			pixel.y-=80;
			this.map.panTo(this.map.pixelToPoint(pixel));
			this.infoWin.show();
			$(this.div).addClass("c-dealer-mapitem-current");
			this.isCurrent=true;
		};
        DealerMapOverlay.prototype.selected=function(selected){
            (selected?$.fn.addClass:$.fn.removeClass).call($(this.div),"c-dealer-mapitem-current");
        },
		DealerMapOverlay.prototype.hideDetail=function(){
			this.infoWin.hide();
			$(this.div).removeClass("c-dealer-mapitem-current");
			this.isCurrent=false;
		};
	}catch(e){
		
	}
})(jQuery,window.ECar||(window.ECar={}),window);