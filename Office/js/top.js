//判断ie6 7
if( /msie (6.0|7.0)/i.test(navigator.userAgent)>0){
	location.href="error.html";
}
+$(function(){
	//head 非css3高度变化
	var $el = $(".header");
	if($el[0].style.transition!=undefined){
		$(window).bind("scroll",function(){
			if($(window).scrollTop()>10){
				$("body").addClass("fixed");
			}else{
				$("body").removeClass("fixed");
			}
		});
	}else{
		$(window).bind("scroll",function(){
			if($(window).width()<995 ) return;
			if($(window).scrollTop()>10 ){
				$el.stop().animate({"padding-top":"0","padding-bottom":"0"},200);
				$(".bg").stop().animate({"padding-top":"104px"},200);
			}else{
				$el.stop().animate({"padding-top":"20px","padding-bottom":"20px"},200);
				$(".bg").stop().animate({"padding-top":"144px"},200);
			}
		});
	}
	//显示nav
	$(".btn_nav_lst").on("click",function(e){
	    e.preventDefault();
		var $el = $(".nav_lst");
		if($el.hasClass("in")){
			$el.removeClass("in").slideUp(300,function(){
				$el.css({"display":""});
			});
		}else{
			$el.addClass("in").slideDown(300);
		}
	});
 });