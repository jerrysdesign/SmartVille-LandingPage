/*	----------------------------------------
*	Global
*	----------------------------------------
*/
	var $win = $(window),
		$section = $('.section'),
		$menu = $('#menu_top'),
		$menuTop = $menu.offset().top,
		$hpGroup = $('.hp-group'),
		$pad = $('.pad'),
		$previewBlock = $('.preview-block'),
		winWidth = $win.width(),
		winScrollTop = $win.scrollTop(),
		loading_timer ,
		loading_count = 0,
		_a = 0;

/*	----------------------------------------
*	Function
*	----------------------------------------
*	00 - Loading
*	01 - Slide_Mask
*	02 - Banner1_Area
*	03 - Tag_Tab
*	04 - Situation_svg
*	----------------------------------------
*/

	//	00
	function loading_progress(){
		loading_count++;
		if(loading_count>100){
			clearInterval(loading_timer);
			loading_count= 100;
		}
		$("#loading_progress").html("Please wait..  "+loading_count + "%");
	}

	//	01
	function slide_mask(idx,old){
		var _wrap = $('.slide-mask-wrapper'),
			_scbg = $('.screen-bg'),
			_mask = _wrap.children(),
			_spd  = 1500,
			_dfh  = 620;
		//	Mask
		_wrap.stop().animate({'height':_dfh}, 0).delay(_spd).animate({'height':0}, 0);
		_mask.stop().animate({'top':_dfh}, _spd).animate({'top': -_dfh}, 0);
		_scbg
		.children().css('z-index', 0)
		.eq(old).css('z-index', 3).end()
		//	pad screenshot
		.eq(idx).css({'z-index': 4,'opacity':'0'}).stop().delay(_spd/1.5).animate({'opacity':'1'}, _spd/2.5);
	}

	//	02
	function banner1_area(obj){
		var _old = $('.screen-bg').attr('data-pic');

		if(obj != _old){
			switch (obj)
			{
				case 0:
					$('.screen-bg')
					.children().css('z-index', 0)
					.eq(_old).css('z-index', 3).end()
					.eq(0).css({'z-index': 4,'opacity':'0'}).stop().animate({'opacity':'1'}, 500);
					$('.screen-bg').attr('data-pic',0);
				break;
				case 1:
					$('.screen-bg')
					.children().css('z-index', 0)
					.eq(_old).css('z-index', 3).end()
					.eq(1).css({'z-index': 4,'opacity':'0'}).stop().animate({'opacity':'1'}, 500);
					$('.screen-bg').attr('data-pic',1);
				break;
				case 2:
					$('.screen-bg')
					.children().css('z-index', 0)
					.eq(_old).css('z-index', 3).end()
					.eq(2).css({'z-index': 4,'opacity':'0'}).stop().animate({'opacity':'1'}, 500);
					$('.screen-bg').attr('data-pic',2);
				break;
				case 3:
					$('.screen-bg')
					.children().css('z-index', 0)
					.eq(_old).css('z-index', 3).end()
					.eq(3).css({'z-index': 4,'opacity':'0'}).stop().animate({'opacity':'1'}, 500);
					$('.screen-bg').attr('data-pic',3);
				break;
			}
		}
	}

	//	03
	function tag_tab(obj){
		var _this = obj,
			_cont = $('.tag-tab-cont').children(),
			_wrap = $('#situation_svg'),
			_mask = _wrap.find('.mask'),
			_idx  = obj.index();
		_this.addClass('active').siblings().removeClass();
		_cont.eq(_idx).show().siblings().hide();
		_mask.hide().eq(_idx).show();
	}

	//	04
	function situation_svg(){
		var _wrap = $('#situation_svg'),
			_mask = _wrap.find('.mask'),
			_link = _wrap.find('.link'),
			_tips = $('.tag-tab-cont').children('li'),
			_tabs = $('.tag-tab').find('li'),
			_atv  = 'active';

		_link.mouseenter(function(){
			var _this = $(this),
				_idx  = _this.index();
			_mask.hide().eq(_idx).show();
			_tips.hide().eq(_idx).show();
			_tabs.removeClass(_atv).eq(_idx).addClass(_atv);
		});
	}

$(function(){

	// Close loading / Open Translation-effect
	$win.load(function(){
		clearInterval(loading_timer);
		if(loading_count<100){
			for(var i=loading_count;i<=100;i++){
				$("#loading_progress").html("Please wait..  "+i + "%");
			}
		}
		$('#loading_box').fadeOut(1000);
	});

	// Loading 
	loading_timer = setInterval(loading_progress, 5);

	// BxSlider API Setting
	var slider = $('.bxslider').bxSlider({
		mode: 'fade',
		captions: true
	});

	// Window Scroll
	$win.scroll(function() {
		var winScrollTop = $win.scrollTop(),
			margin = 0,
			$s2Top = $('.section').eq(1).offset().top,
			topOfWindow = winScrollTop + margin;

		if ($s2Top > topOfWindow) {
			$hpGroup.removeClass().addClass("hp-group");
		}
		// senction = 0
		if ( winScrollTop <= 206-65 ) {
			$('.hand--l, .hand--r').removeClass("hide");
		}
		// senction 0 to section 1
		if ( winScrollTop > 207-65 ){
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
			// #menu_top - background opacity
			$menu.css('background-color', 'rgba(255,255,255,' + .25 + ')');
		}
		if ( winScrollTop > 500 ){
			$('.text-a,.text-b,.text-c,.text-d').fadeOut(0);
			// #menu_top - background opacity
			$menu.css('background-color', 'rgba(255,255,255,' + 1 + ')');
		}
	}).scroll();

	// Menu-Area
	$('.screen-bg > div:eq(0)').css('z-index', 4);
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
		// service - pages_btn 
		$('.bx-pager-item').eq(_this.index()).children().click();
	});

	// Service-Pages
	$('body').on('click','.bx-pager-item a',function(){
		var _idx = $(this).parent().index();
		banner1_area(_idx);
		$('#slide-btn li').removeClass('active').eq(_idx).addClass('active');
		setTimeout(function()
		{
			$('#mian-slider > li').eq(_idx).show().siblings().hide();
		}, 400);
	});
	
	// Prev & Next
	$('body').on('click','.bx-controls-direction a',function(){
		var _idx = $('.bx-pager-item .active').parent().index();
		$('.bx-pager-item a').eq(_idx).click();
		setTimeout(function()
		{
			$('#mian-slider > li').eq(_idx).show().siblings().hide();
		}, 400);
	});

	// Tag-Tabs
	$('.tag-tab li').mouseenter(function(){
		tag_tab($(this));
	});
	$('.tag-tab-cont').children().not(':eq(0)').hide();

	// Situation_svg
	situation_svg();
	
	// Scroll up bar
	$menu.scrollupbar();

	// Parallax Scrolling
	$.stellar({
		horizontalScrolling: false,
		verticalOffset: 0
	});

	// WOW Scrolling - effect
	var ww = $win.width();
	if(ww > 480){
		wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: true,
			live: true
		});
		wow.init();
	}

	// Menu-top
	var $topLinks = $('.navigation-top').find('li'),
		$rightLinks = $('.navigation-right').find('li'),
		$Links = $('.navigation-top,.navigation-right').find('li'),
		$section = $('.section'),
		htmlbody = $('html,body');

	$section.waypoint(function(){
		var datasection = $(this).attr('data-section'),
			$topLinksDatasection = $('.navigation-top li[data-section="' + datasection + '"]'),
			$rightLinksDatasection = $('.navigation-right li[data-section="' + datasection + '"]'),
			$sectionDatasection = $('.section[data-section="' + datasection + '"]');

		// Scrolling - Toggle_style
		$Links.removeClass('active');
		$section.removeClass('current');
		$topLinksDatasection.addClass('active');
		$rightLinksDatasection.addClass('active');
		$sectionDatasection.addClass('current');
		// console.log('datasection'+':'+datasection);
	});
	$win.scroll(function(){
		if ($win.scrollTop() == 0){
			$Links.removeClass('active');
			$('.navigation-top li[data-section="0"]').addClass('active');
		}
	}).scroll();

	// GoToByScroll
	function goToByScroll(datasection){
		var goal = $('.section[data-section="' + datasection + '"]').offset().top;

		function offSetKey1(){
			if ($win.scrollTop() < goal){
				var goalPx = goal + 50;
				// console.log("goalPxif"+"="+ goalPx);
			}
			else{
				var goalPx = goal - 50;
				// console.log("goalPxelse"+"="+ goalPx);
			}
			htmlbody.stop().animate({
				scrollTop: goalPx
			}, 1500, 'easeInOutQuint');
		}
		function offSetKey2(){
			if ($win.scrollTop() < goal){
				var goalPx = goal + 204;
				// console.log("goalPxif"+"="+ goalPx);
			}
			else{
				var goalPx = goal + 104 ;
				// console.log("goalPxelse"+"="+ goalPx);
			}
			htmlbody.stop().animate({
				scrollTop: goalPx
			}, 1500, 'easeInOutQuint');
		}

		if (datasection == 0){
			offSetKey1();
		}
		if (datasection == 1){
			offSetKey1();
		}
		if (datasection == 2){
			offSetKey1();
		}
		if (datasection == 3){
			offSetKey2();
		}
		if (datasection == 4){
			offSetKey1();
		}
		if (datasection == 5){
			offSetKey1();
		}
		if (datasection == 6){
			offSetKey2();
		}
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
	
	// Video Background
	$('.player .video-wrapper').css('background','#D8D8D8');

	// Situation_svg - Tips Z-index
	var $icnTag = $('.icn-tag');
	$icnTag.css({'z-index':1});
	$icnTag.hover(function() {
		$(this).css({'z-index':9999});
	},function(){
		$(this).css({'z-index':1});
	});
});

// 瀏覽器視窗 663(扣掉瀏覽器工具列)時
$(function(){
	wh = $(window).height();
	if (wh < 663) {
		var sss1H;
		function sliderHeight(){
			$('#section-0').css({height:wh});
			sss1H = $('#section-1').css({'padding-top':'25px','padding-bottom':'25px'});
			sss1H = $('#section-1').outerHeight();
			$('#section-1').css('margin-top',sss1H*-1);
		}
		sliderHeight();
	};
});
$(window).bind('resize',function() {
  sliderHeight();
});
/*	----------------------------------------
*	Console
*	----------------------------------------
*/
	//	Get Section Offset
	//	$section.each(function(){
	//	console.log($section.eq(_a).offset());
	//	_a++;
	//	});
function layoutdebug(){
	var layoutdebug = function(a){
	[].forEach.call(
		document.querySelectorAll(a),
		function(b){
			b.style.outline = "1px solid #" +
			(~~(Math.random()*(1<<24)))
			.toString(16)})
	}
	layoutdebug('*');
	$('body').addClass("debug");
}
//console.log('cptest')