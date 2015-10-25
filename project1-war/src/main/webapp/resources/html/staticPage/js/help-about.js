/*
 * @description: user for help and about static pages;
 * @author:lingweifeng;
 * @data:20140227;
*/
(function(){
	var data = {
		helpMenu:{
			url: [
				"reg-agreement.html",
				"reg-path.html",
				"member-integral.html",
				"car-price.html",
				"complaint.html"
			],
			text: [
				"用户服务协议",
				"会员注册流程",
				"会员积分&权益说明",
				"车享价说明",
				"投诉建议"
			]
		},
		aboutMenu:{
			url: [
				"about.html",
				"terms.html",
				"privacy.html",
				"impunity.html",
				"contact.html"
			],
			text: [
				"关于车享",
				"法律声明",
				"隐私权声明",
				"免责条款",
				"联系我们"
			]
		},
		helpFoot:{
			url: [
				"../about/about.html",
				"../about/terms.html",
				"../about/impunity.html",
				"../about/privacy.html",
				"../about/contact.html",
				"reg-path.html",
				"reg-agreement.html",
				"member-integral.html",
				"complaint.html",
				"http://dealer.chexiang.com/dop/"
			],
			text: [
				"关于车享", 
				"法律声明", 
				"免责条款", 
				"隐私权声明", 
				"联系我们", 
				"帮助中心", 
				"用户服务协议", 
				"会员说明", 
				"投诉建议",
				"经销商登录"
			]
		},
		aboutFoot:{
			url: [
				"about.html",
				"terms.html",
				"impunity.html",
				"privacy.html",
				"contact.html",
				"../help/reg-path.html",
				"../help/reg-agreement.html",
				"../help/member-integral.html",
				"../help/complaint.html",
				"http://dealer.chexiang.com/dop/"
			],
			text: [
				"关于车享", 
				"法律声明", 
				"免责条款", 
				"隐私权声明", 
				"联系我们", 
				"帮助中心", 
				"用户服务协议", 
				"会员说明", 
				"投诉建议",
				"经销商登录"
			]
		}
	};
	
	var hNum = data.helpMenu.url.length,
		aNum = data.aboutMenu.url.length,
		fNum = data.helpFoot.url.length,
		hMenuOut = document.getElementById("hMenu"),
		aMenuOut = document.getElementById("aMenu"),
		navOut = document.getElementById("nSubNav"),
		positionOut = document.getElementById("breadCrumbs"),
		footOut = document.getElementById("footer"),
		pageCursel = document.getElementsByTagName("body")[0].className;
	
	//通过body上的class对应html文件名判断是否当前页面
	function whichPage(n, o){
		for(i=0; i<n; i++){
			if(pageCursel == o.url[i].replace(/.html/,"")){
				return i;	
			};
		};
	}
	
	//加载页面链接内容方法
	function render(wrap, n, o){
		wrap.innerHTML = "";
		for(i=0; i<n; i++){
			if(n == fNum){	//底部链接
				wrap.innerHTML += "<li><a href=\""+ o.url[i] +"\" target=\"_blank\">"+ o.text[i] +"</a></li>";
			}
			else{	//菜单链接
				wrap.innerHTML += "<li><a href=\""+ o.url[i] +"\">"+ o.text[i] +"</a></li>";
			}
		};
	}
	
	//加载页面链接内容方法
	function renderHead(title){
		var navInner = "<div class=\"subnav-cont\">";
		navInner += "<div class=\"saiclogo\">";
		navInner += "<a href=\"http://www.chexiang.com/\">";
		navInner += "<img class=\"logo-first\" src=\"../images/indexPage/s_logo.png\" width=\"106\" height=\"46\" border=\"0\"> ";
		navInner += "<img class=\"logo-first\" src=\"../images/indexPage/s_slogan.gif\" width=\"106\" height=\"46\" border=\"0\">";
		navInner += "</a>";
		navInner += "</div>";
		navInner += "<span class=\"headerIntro\" style=\"margin-top:20px;\"><span class=\"f-24\">" + title + "</span></span>";
		navInner += "</div>";
		navOut.innerHTML = "";
		navOut.innerHTML = navInner;
	}

	//加载底部
	var footInner = "<ul class=\"footer_link\"></ul>";
	footInner += "<div class=\"copyrightbox simplecopy\">";
	footInner += "<div class=\"copyright\">";
	footInner += "<div class=\"copyright-infor\">";
	footInner += "<p>CopyRight © 2013-2014 ,All Rights Reserved版权所有 车享</p>";
	footInner += "<p>沪ICP备14000481号</p>";
	footInner += "</div>";
	footInner += "</div>";
	footInner += "</div>";
	footOut.innerHTML = "";
	footOut.innerHTML = footInner;

	//加载帮助中心
	var fLinkOut = footOut.getElementsByTagName("ul")[0], n, currentTit;
	if(hMenuOut){
		//加载头部
		renderHead("帮助中心");
		//加载左侧菜单
		render(hMenuOut, hNum, data.helpMenu);
		n = whichPage(hNum, data.helpMenu);
		currentTit = hMenuOut.getElementsByTagName("li")[n].getElementsByTagName("a")[0].innerHTML;
		hMenuOut.getElementsByTagName("li")[n].className = "current";
		//加载底部链接项
		render(fLinkOut, fNum, data.helpFoot);
	}
	
	//加载关于我们
	else{
		//加载头部
		renderHead("关于车享");
		//加载左侧菜单
		render(aMenuOut, aNum, data.aboutMenu);
		n = whichPage(hNum, data.aboutMenu);
		currentTit = aMenuOut.getElementsByTagName("li")[n].getElementsByTagName("a")[0].innerHTML;
		aMenuOut.getElementsByTagName("li")[n].className = "current";
		//加载底部链接项
		render(fLinkOut, fNum, data.aboutFoot);
	}
	//加载面包屑
	positionOut.innerHTML = "";
	positionOut.innerHTML = "<a href=\"http://www.chexiang.com\/\">首页</a>&gt;<span>" + currentTit + "</span>";
	//底部链接最后一项加样式
	fLinkOut.getElementsByTagName("li")[fNum-1].className = "dealersenter";

}())