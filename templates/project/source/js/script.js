// $('html').css('overflow', 'auto');
// $('body').css('overflow-x', 'hidden');

// if (typeof console == "undefined") var console = { log: function() {} };

// var $section = $('section'),
// 	si = $section.index();
// 	console.log(si);

// for(i=0; i<=si; i++) {
// 	console.log($section.index(i).offset().top);
// }


var $win = $(window),
	$s0 = $('#section-0'),
	$s1 = $('#section-1'),
	$s2 = $('#section-2'),
	$s3 = $('#section-3'),
	$s4 = $('#section-4'),
	$s5 = $('#section-5'),
	$s6 = $('#section-6'),

	$s0Top = $s0.offset().top,
	$s1Top = $s1.offset().top,
	$s2Top = $s2.offset().top,
	$s3Top = $s3.offset().top,
	$s4Top = $s4.offset().top,
	$s5Top = $s5.offset().top,
	$s6Top = $s6.offset().top,

	$menu = $('#menu_top'),
	$menuTop = $menu.offset().top,

	$hpGroup = $('.hp-group'),
	$pad = $('.pad'),
	$previewBlock = $('.preview-block'),
	
	winWidth = $win.width(),
	winScrollTop = $win.scrollTop();

var loading_timer ;
var loading_count = 0;

// 關閉loading  開啟換盤動畫
$win.load(function(){
	clearInterval(loading_timer);
	
	if(loading_count<100){
		for(var i=loading_count;i<=100;i++){
			$("#loading_progress").html("Please wait..  "+i + "%");
		}
	}
	$('#loading_box').fadeOut(1000);
});

$(function(){
	//loading 
	loading_timer = setInterval(loading_progress, 5);
	function loading_progress(){
		loading_count++;
		if(loading_count>100){
			clearInterval(loading_timer);
			loading_count= 100;
		}
		$("#loading_progress").html("Please wait..  "+loading_count + "%");
	}
});


$(function(){
	var slider = $('.bxslider').bxSlider({
		mode: 'fade',
		captions: true,
		adaptiveHeight: true,
		pagerCustom: '.bx-pager',
		onSlideAfter: function(){
		// do mind-blowing JS stuff here
		}
	});
	// $win.scroll(function(e) {
	// 	if ( winScrollTop = 508 ) {
	// 		e.preventDefault();
	// 		slider.reloadSlider();
	// 	}
	// }).scroll();
	$win.scroll(function() {
		var winScrollTop = $win.scrollTop();
		var margin = 0,
			topOfWindow = winScrollTop + margin;
		
		if ($s2Top > topOfWindow) {
			$hpGroup.removeClass().addClass("hp-group");
		}
		// senction 0 時
		if ( winScrollTop <= 206 ) {
			$('.hand--l, .hand--r').removeClass("hide");
		}
		// senction 0 to section 1
		if ( winScrollTop > 207 ){
			$('.hand--l, .hand--r').addClass("hide");
		}
		
		if (winScrollTop < 508) {
			$hpGroup.removeClass("transform");
			$hpGroup.removeClass("gogo");
			$(".advantages").removeClass("current");
			$(".bx-viewport").css({'height':165});
			$(".bxslider > li").css({'width':646,'height':165});

		}
		if (winScrollTop > 508) {
			$hpGroup.addClass("transform");
			$hpGroup.addClass("gogo");
			$(".advantages").addClass("current");
			$(".bx-viewport").css({'height':265});
			$(".bxslider > li").css({'width':313,'height':265});
		}
		if ($s2Top > topOfWindow) {
			$previewBlock.delay(100).removeClass('show');
		}
		if ($s2Top-200 < topOfWindow) {
			$previewBlock.delay(500).addClass('show');
		}
		
		if ( winScrollTop < 500 ) {
			$('.text-a,.text-b,.text-c,.text-d').fadeIn(0);

			// #menu_top 的背景透明度變化
			$menu.css('background-color', 'rgba(255,255,255,' + .25 + ')');
		}
		if ( winScrollTop > 500 ){
			$('.text-a,.text-b,.text-c,.text-d').fadeOut(0);

			// #menu_top 的背景透明度變化
			$menu.css('background-color', 'rgba(255,255,255,' + 1 + ')');
		}

	}).scroll();
});

function slide_mask(idx,old){
	var _wrap = $('.slide-mask-wrapper'),
		_scbg = $('.screen-bg'),
		_mask = _wrap.children(),
		_spd  = 1500,
		_dfh  = 620;
	// 遮罩
	_wrap.stop().animate({'height':_dfh}, 0).delay(_spd).animate({'height':0}, 0);
	_mask.stop().animate({'top':_dfh}, _spd).animate({'top': -_dfh}, 0);
	_scbg
	.children().css('z-index', 0)
	.eq(old).css('z-index', 3).end()
	// pad screenshot
	.eq(idx).css({'z-index': 4,'opacity':'0'}).stop().delay(_spd/1.5).animate({'opacity':'1'}, _spd/2.5);
}

function tag_tab(obj){
	var _this = obj,
		_cont = $('.tag-tab-cont').children();
	obj.addClass('active').siblings().removeClass();
	_cont.eq(obj.index()).show().siblings().hide();
}

$(function(){
	// menu-area
	$('#slide-btn li').click(function(){
		var _this = $(this),
			_active  = 'active',
			_old = $('.screen-bg').attr('data-pic');
		$('.screen-bg').attr('data-pic',_this.index());
		if(!_this.hasClass(_active))
		{
			slide_mask(_this.index(),Number(_old));
			_this.addClass(_active).siblings().removeClass(_active);
			setTimeout(function()
			{
				$('#mian-slider > li').eq(_this.index()).show().siblings().hide();
			}, 400);
		}
	});

	// banner1-area
	$('.adv-01,.adv-02,.adv-03,.adv-04').mouseenter(function(){
		var _class  = $(this).attr('class'),
			_items = _class.substr(5,1),
			_old = $('.screen-bg').attr('data-pic');
		switch (_items)
		{
			case '1':
				$('.screen-bg')
				.children().css('z-index', 0)
				.eq(_old).css('z-index', 3).end()
				.eq(0).css({'z-index': 4,'opacity':'0'}).stop().animate({'opacity':'1'}, 500);
				$('.screen-bg').attr('data-pic',0);
			break;
			case '2':
				$('.screen-bg')
				.children().css('z-index', 0)
				.eq(_old).css('z-index', 3).end()
				.eq(1).css({'z-index': 4,'opacity':'0'}).stop().animate({'opacity':'1'}, 500);
				$('.screen-bg').attr('data-pic',1);
			break;
			case '3':
				$('.screen-bg')
				.children().css('z-index', 0)
				.eq(_old).css('z-index', 3).end()
				.eq(2).css({'z-index': 4,'opacity':'0'}).stop().animate({'opacity':'1'}, 500);
				$('.screen-bg').attr('data-pic',2);
			break;
			case '4':
				$('.screen-bg')
				.children().css('z-index', 0)
				.eq(_old).css('z-index', 3).end()
				.eq(3).css({'z-index': 4,'opacity':'0'}).stop().animate({'opacity':'1'}, 500);
				$('.screen-bg').attr('data-pic',3);
			break;
		}
	});
	
	// tag-tabs
	$('.tag-tab li').click(function(){
		tag_tab($(this));
	});
	$('.tag-tab-cont').children().not(':eq(0)').hide();
});


$(function(){
	
	var $win = $(window);

	// Scroll up bar
	$menu.scrollupbar();
	$menu.css({'position':'fixed'});
	// 滾動視差
	$.stellar({
		horizontalScrolling: false,
		verticalOffset: 0
	});

	// 滾動動畫
	var ww = $win.width();
	if(ww > 480){
		wow = new WOW({
		animateClass: 'animated',
		offset: 0
		});
		wow.init();
	}

	// 捲動換單元

	// menu-top
	var $topLinks = $('.navigation-top').find('li'),
		$rightLinks = $('.navigation-right').find('li'),
		$Links = $('nav').find('li'),
		$section = $('.section'),
		htmlbody = $('html,body');

	$section.waypoint(function(){
		var datasection = $(this).attr('data-section'),
			$topLinksDatasection = $('.navigation-top li[data-section="' + datasection + '"]'),
			$rightLinksDatasection = $('.navigation-right li[data-section="' + datasection + '"]');

		// scrool 增減樣式
		$Links.removeClass('active');

		$topLinksDatasection.addClass('active');
		$rightLinksDatasection.addClass('active');
	});

	$win.scroll(function(){
		if ($win.scrollTop() == 0){
			$Links.removeClass('active');
			$('.navigation-top li[data-section="0"]').addClass('active');
		}
	}).scroll();

	function goToByScroll(datasection){
		var goal = $('.section[data-section="' + datasection + '"]').offset().top;
		console.log("goal"+"="+ goal);
		if ($win.scrollTop() < goal){
			var goalPx = goal + 50;
			console.log("goalPxif"+"="+ goalPx);
		}
		else{
			var goalPx = goal - 50;
			console.log("goalPxelse"+"="+ goalPx);
		}
		htmlbody.stop().animate({
			scrollTop: goalPx
		}, 1500, 'easeInOutQuint');
	}

	// Logo
	$('.menu_tag,.gos2').click(function (e){
		e.preventDefault(e);
		datasection = $(this).attr('data-section');
		goToByScroll(datasection);
	});

	// Menu & Nav
	$Links.click(function (e){
		e.preventDefault(e);
		datasection = $(this).attr('data-section');
		goToByScroll(datasection);
	});


	//
	// $('.bxslider').bxSlider({
	// 	mode: 'fade',
	// 	captions: true,
	// 	adaptiveHeight: true,
	// 	pagerCustom: '.bx-pager',
	// 	onSlideAfter: function(){
	// 	// do mind-blowing JS stuff here
	// 	}
	// });
	

	//
	$('.player .video-wrapper').css('background','#D8D8D8');

	// console
	// console.log(si);

	console.log('$s0Top'+':'+$s0Top);
	console.log('$s1Top'+':'+$s1Top);
	console.log('$s2Top'+':'+$s2Top);
	console.log('$s3Top'+':'+$s3Top);
	console.log('$s4Top'+':'+$s4Top);
	console.log('$s5Top'+':'+$s5Top);
	console.log('$s6Top'+':'+$s6Top);
	console.log('$menuTop'+':'+$menuTop);

	$win.scroll(function(){
		console.log($win.scrollTop());
	}).scroll();

});
