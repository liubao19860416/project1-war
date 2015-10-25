/**
 * 经销商聚合页功能
 * xu xiangcheng
 */
;(function($,ECar){
	var listScroller=ECar.imitatescroll({
			id:"#DealerList"
		}),
		list=$("#DealerList ul.dealer-list-content-list"),
		ajax,ajaxTimer,
		dealerUrl=base+"/octaviaActivity/finddistributor_{cityId}_{areaId}_{brandId}_{classId}.htm",
		map;

	$(window).bind("filter.change",function(e){
		clearTimeout(ajaxTimer);
		ajaxTimer=setTimeout(loadDealers,100);
	});
	//经销商点击与隐藏事件监听
	$(window).bind("dealer.click",function(e){
		map.showDealer(e.index);
		list.find(".selected").removeClass("selected");
		var current=list.find("li:eq("+e.index+")").addClass("selected");
		listScroller.scrollTo(current.position().top);
	});
	$(window).bind("dealer.hide",function(e){
		map.hideDealer(e.index);
		list.find(".selected").removeClass("selected");
	});
	
	$(window).trigger("filter.change");
	$("#cityId").change(function(){
		var $this=$(this);
		cityCookie($this.val(),$this[0].options[this.selectedIndex].innerHTML)
	});
	$("#areaSel select").change(function(){$(window).trigger("filter.change");});
	new ECar.uiform("#areaSel .sel-city",{selectClass:"form-select sel-city"});
	new ECar.uiform("#areaSel .sel-area",{selectClass:"form-select sel-area"});
	ECar.seriesSelect($("#areaSel"), {
		selects: ["sel-city", "sel-area"],
		url: base + "/tryDrive/ajax/ajaxDistrictList.htm"
	});
	function loadDealers(){
		var url = dealerUrl.replace(/{cityId}/, $("#cityId").val())
							.replace(/{areaId}/,$("#areaId").val()||0)
							.replace(/{brandId}/,$("#brandId").val()||0)
							.replace(/{classId}/,$("#serialId").val()||0);

		ajax&&ajax.abort();
		ajax = $.getJSON(url,function(data){
			bindData(data,list);
		});
	}
	function bindData(data,container){
		//清除地图
		map&&map.clearDealers();
		if(data.length==1&&!data[0].storeId){
			container.html('<li class="null"><i class="icon icon-alert-gray-m"></i><div>'+data[0].name||""+'</div></li>');
			listScroller.reset();
			return;
		}
		container.empty();
		var frag=$(document.createDocumentFragment()),minlng=360,minlat=90,maxlng=3,maxlat=0;
		$(data).each(function(i,item){
			item.index=i;
			item.longitude=parseFloat(item.longitude);
			item.latitude=parseFloat(item.latitude);
			var html="",name=item.name;
			if(name.length>30){
				name=name.substring(0,29)+"...";
			}
			//在列表中显示
			html='<li id="dealer_'+item.storeId+'">'+
						'<a href="javascript:void(0)" '+(item.name.length>30?'title="'+item.name+'"':'')+'>'+name+'</a>'+
					'</li>';

			$(html).addClass(i%2==0?"odd":"even").appendTo(frag).on("click",function(e){
				$(window).trigger({type:"dealer.click",index:item.index});
			});
			minlng=item.longitude<minlng?item.longitude:minlng;
			maxlng=item.longitude>maxlng?item.longitude:maxlng;
			minlat=item.latitude<minlat?item.latitude:minlat;
			maxlat=item.latitude>maxlat?item.latitude:maxlat;
		});
		if(typeof(BMap)!=="undefined"){
			if(!map){
				map=new ECar.map("DealerMap",[new BMap.Point(minlng,minlat),new BMap.Point(maxlng,maxlat)]);
			}else{
				map.setViewport([new BMap.Point(minlng,minlat),new BMap.Point(maxlng,maxlat)]);	
			}
			//在地图中显示点
			map.bindDealers(data,function(data){
				var html="",
					name=data.name,
					prom=data.promotionTitle||"",
					serialId=$("#serialId").val()||-1;
				if(name.length>30){
					name=name.substring(0,29)+"..."
				}
				if(prom.length>14){
					prom=prom.substring(0,13)+"..."
				}
				html='<h5><a href="'+_DealerUrl_.replace('{id}',data.storeId)+'" target="_blank" '+(data.name.length>30?'title="'+data.name+'"':'')+'>'+name+'</a></h5>'+
					'<p>经营品牌：'+data.brandName+'</p>'+
					'<p class="c-dealer-map-info-address">地址：'+data.address+'</p>'+
					'<p><span class="icon iphoneicon"></span><span class="telcolor">'+data.tel+'</span><input class="btn btn-dealercall" data-dealercall="'+data.storeId+'" type="button" value="免费咨询"></p>'+
					(prom==""?"":'<p class="c-dealer-map-info-event"><strong>促销</strong><a href="'+_EventUrl_.replace(/\{[^\}]*\}/g,function(e){
						if(e=="{id}")return data.storeId;
						else if(e=="{eid}")return data.promotionId;
					})+'" target="_blank" '+(data.promotionTitle.length>14?'title="'+data.promotionTitle+'"':'')+'>'+prom+'</a></p>')+
					'<p class="c-dealer-map-info-btnset"><a href="'+_TrailDive_.replace(/\{[^\}]*\}/g,function(e){
						if(e=="{id}")return data.storeId;
						else if(e=="{brandId}")return data.brandId;
						else if(e=="{serialId}")return serialId;
					})+'" target="_blank" class="btn btn126-34 btn-blue btn-med-drive">预约试驾</a></p>';
				
				return html;
			});
		}
		frag.appendTo(container);
		listScroller.reset();
		//默认选择url中的dealerId的经销商
		if(/[\?,&]dealerId=[^&]+/.test(location.search)){
			var dealerId=location.search.replace(/.*dealerId=([^&]*).*/,"$1");
			var dealerli=$("#dealer_"+dealerId);
			if(dealerli.length>0){
				dealerli.trigger("click");
			}
		}else{
			setTimeout(function(){
				container.find("li:first").trigger("click");
			},200);
		}
		
	}
	function cityCookie(cityId, cityName,domain){
		var expires = new Date();  
		if(!domain){
			domain=document.cookie.match(/(^| )city\.domain=([^;]*)(;|$)/)
			domain&&(domain=domain[2]);
		}
		expires.setTime(expires.getTime() + 12 * 30 * 24 * 60 * 60 * 1000);  
		var domainStr = domain&&domain!="null"?(";domain="+domain):"";
		document.cookie = "city.id="+encodeURIComponent(cityId)+";expires="+expires.toGMTString()+";path=/"+domainStr;
		document.cookie = "city.name="+encodeURIComponent(cityName)+";expires="+expires.toGMTString()+";path=/"+domainStr;
		document.cookie = "city.domain="+encodeURIComponent(domain)+";expires="+expires.toGMTString()+";path=/"+domainStr;
		document.cookie = "city.test="+encodeURIComponent(domain)+";expires="+expires.toGMTString()+";path=/";
		
	};
})(jQuery,window.ECar||(window.ECar={}));