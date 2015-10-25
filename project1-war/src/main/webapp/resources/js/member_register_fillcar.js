(function($){
	var brandtemid=$("#brandtem").val();
	var serietemid=$("#serietem").val();
	var modeltemid=$("#modeltem").val();
	ECar.placeholder($('input'));
	
	if(brandtemid!=null&&brandtemid!=""&&brandtemid!="-1"){
		$.getJSON(base+"/account/getSeriesByBrandId.htm?brandid="+brandtemid, function(data) {
			$("#series").empty();
			if(data){
				$("#series").append("<option value=-1>请选择</option>");
				for(var key in data){
						if(serietemid==key){
							$("#series").append("<option selected value='" +  key +"'>" + data[key]+ "</option>");
						}else{
							$("#series").append("<option value='" +  key +"'>" + data[key]+ "</option>");	
						}
					}
				$("#series").append("<option value=999999>其他</option>");
			}
		});
		
		if(serietemid!=null&&serietemid!=""&&serietemid!="-1"){
			$.getJSON(base+"/account/findVelModelsBySeriesId.htm?seriesid="+serietemid, function(data) {
				$("#models").empty();
				if(data){
					$("#models").append("<option value=-1>请选择</option>");
					for(var key in data){
								if(modeltemid==key){
									$("#models").append("<option selected value='" +  key +"'>" + data[key]+ "</option>");
								}else{
									$("#models").append("<option value='" +  key +"'>" + data[key]+ "</option>");
								}
						}
					$("#models").append("<option value=999999>其他</option>");
					}

			});
			
		}
	}
	
	var brandStatus = true;
	var $brandItems = $(".brand-item");
	$("#brands").on("click", ".brand-item", function() {
		var $this = $(this);
		if($this.hasClass("selected")) return;
		$brandItems.removeClass("selected");
		var bid=$this.addClass("selected").data("val");
		$("#brandId").val(bid);
		if(bid!="-1"){
			$.getJSON(base+"/account/getSeriesByBrandId.htm?brandid="+bid, function(data) {
				$("#series").empty();
				if(data){
					$("#series").append("<option value=-1>请选择</option>");
					for(var key in data){
						$("#series").append("<option value='" +  key +"'>" + data[key]+ "</option>");
						}
					//$("#series").append("<option value=999999>其他</option>");
					$("#models").empty().append("<option value='-1'>请选择</option>");
				}
			});
		}
		$("#brands").find(".m-err").hide();
	});
	
	$("#series").change(function(){
		//$(".reg-error ").eq(1).hide();
		if ($("#series").val()=="0" || $("#model").val()=="-1"){
			$("#models").empty();
			$("#models").append("<option value=-1>请选择</option>");
			$("#models").append("<option value=999999>其他</option>");
			return;
		}
		$.getJSON(base+"/account/findVelModelsBySeriesId.htm?seriesid="+$("#series").val(), function(data) {
			$("#models").empty();
			if(data){
				$("#models").append("<option value=-1>请选择</option>");
				for(var key in data){
					$("#models").append("<option value='" +  key +"'>" + data[key]+ "</option>");
					}
				//$("#models").append("<option value=999999>其他</option>");
				}

		});
	});
	
	var modelStatus = false;
	$("#models").on("change validate", function () {
		var $this = $(this),
			errMsg = $this.siblings(".m-err");
		if($(this).val() == "-1") {
			errMsg.find("span").text("车型必须选择");
			errMsg.show();
			validstatus = false;
		} else {
			errMsg.hide();
			modelStatus = true;
		}
	});
	
	var seriesStatus = false;
	$("#series").on("change validate", function () {
		var $this = $(this),
			errMsg = $this.siblings(".m-err");
		if($(this).val() == "-1") {
			errMsg.find("span").text("车系必须选择");
			errMsg.show();
			validstatus = false;
		} else {
			errMsg.hide();
			seriesStatus = true;
		}
	});
	
	var buyTimeStatus = true;
	$("#buytime").on("blur validate", function () {
		var yearReg = /^19[0-9][0-9]|20[0-9][0-9]$/,
			$this = $(this),
			errMsg = $this.closest("dd").find(".m-err"),
			val = $.trim($this.val());
		if(!yearReg.test(val)) {
			//errMsg.find("span").text("年份格式不正确");
			errMsg.find("span").text("年份必须选择");
			errMsg.show();
			buyTimeStatus = false;
		} else {
			buyTimeStatus = true;
		}
	});
	
	$("#buytime").on("focus", function () {
		//var errMsg = $("#buytime").siblings(".m-err");
		var errMsg = $("#buytime").closest("dd").find(".m-err");
		if(errMsg.is(":visible")) {
			errMsg.hide();
		}
	});
	
	var $form = $("#carinfo-form");
	$("#carintosubmit").on("click", function() {
		if($("#brands").find(".selected").length === 0) {
			$("#brands").find(".m-err").show().find('span').text('品牌必须选择');
			brandStatus = false;
		} else {
			brandStatus = true;
		}
		$("#series").trigger("validate");
		$("#models").trigger("validate");
		$("#buytime").trigger("validate");

		if(brandStatus && buyTimeStatus && seriesStatus && modelStatus) {
			if($("#buytime").val()!="-1"&&$("#series").val()!="-1"&&$("#models").val()!="-1"){
				$form.submit();	
			}
			
		} else {
			return;
		}
	});
	
	 
	
})(jQuery);