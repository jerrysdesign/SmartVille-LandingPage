/*	----------------------------------------
*	Global
*	----------------------------------------
*/
	var $win			= $(window),
		$body			= $('body'),
		$section		= $('.section'),
		$menu			= $('#menu_top'),
		$menuTop		= $menu.offset().top,
		$hpGroup		= $('.hp-group'),
		$pad			= $('.pad'),
		$previewBlock	= $('.preview-block'),
		$banner			= $('.banner--tablet'),
		$mianSlider		= $('#mian-slider'),
		$menuRight		= $('#menu_right'),
		winWidth		= $win.width(),
		winHeight		= $win.height(),
		winScrollTop	= $win.scrollTop(),
		loading_timer	= 0,
		loading_count	= 0,
		_a				= 0;

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
	
	// 判斷瀏覽裝置為行動裝置
	function is_mobile(){
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
	}

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
			_cont = $('.scene-cont').children(),
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
			_tips = $('.scene-cont').children('li'),
			_tabs = $('.scene-tab-nav__list').find('li'),
			_atv  = 'active';

		_link.mouseenter(function(){
			var _this = $(this),
				_idx  = _this.index();
			_mask.hide().eq(_idx).show();
			_tips.hide().eq(_idx).show();
			_tabs.removeClass(_atv).eq(_idx).addClass(_atv);
		});
	}

	// 05
	// 垂直置中
	(function($){
		$.fn.verticalaligncenter = function(options){
			var defaults = {
			};
			var opts = $.extend({}, defaults, options);
			return this.each(function(){
				var _this = $(this), 
					_Height = _this.outerHeight(true);
				_this.css({'top': '50%', 'margin-top': (_Height/2)*-1});
				
			});
		};
	})(jQuery);

	// 06
	// 全畫面
	(function($){
		$.fn.fullsize = function(options){
			// var $win		= $(window),
			// 	winWidth	= $win.width(),
			// 	winHeight	= $win.Height();
			var defaults = {};
			var opts = $.extend({}, defaults, options);
			return this.each(function(){
				var _this = $(this),
					$selectHeight = options.height();
					_Height = winHeight;
				_this.css({
					'width'	: '100%',
					'height': _Height
				});
				_this.css({'width': '100%', 'height': _Height - $selectHeight});
			});
		};
	})(jQuery);


$(function(){
	// ==========================================
	// 不分裝置一律做
	// ==========================================

	// BxSlider API Setting
	var slider = $('.bxslider').bxSlider({
		captions: true,
		adaptiveHeight: true,
		mode: 'fade'
	});
	// 重整 BxSlider
		function reloadslider(){
			slider.reloadSlider({
				captions: true,
				adaptiveHeight: true,
				mode: 'fade'
			});
		}

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
		if (winScrollTop < 507) {
			$hpGroup.removeClass("transform");
			$hpGroup.removeClass("gogo");
			$(".advantages").removeClass("current");
			reloadslider();
		}
		if (winScrollTop > 508) {
			$hpGroup.addClass("transform");
			$hpGroup.addClass("gogo");
			$(".advantages").addClass("current");
			reloadslider();
		}
		if ($s2Top > topOfWindow) {
			$previewBlock.delay(100).removeClass('show');
		}
		if ($s2Top-200 < topOfWindow) {
			$previewBlock.delay(500).addClass('show');
		}
		if ( winScrollTop < 500 ) {
			$('.slide__content').fadeIn(0);
			// #menu_top - background opacity
			if( winWidth > 768 ){
				$menu.css('background-color', 'rgba(255,255,255,' + .25 + ')');
			}
		}
		if ( winScrollTop > 500 ){
			$('.slide__content').fadeOut(0);
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

	//.scene-tab-nav__lists
	$('.scene-tab-nav__list li').mouseenter(function(){
		tag_tab($(this));
	});
	$('.scene-cont').children().not(':eq(0)').hide();

	// Situation_svg
	situation_svg();
	
	// Scroll up bar
	// $menu.scrollupbar();

	// Parallax Scrolling
	$.stellar({
		horizontalScrolling: false,
		verticalOffset: 0
	});

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
	// WOW Scrolling - effect
	if(winWidth > 480){
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
		$sideLinks = $('.navigation-side').find('li'),
		$rightLinks = $('.navigation-right').find('li'),
		$Links = $('.navigation-top,.navigation-right').find('li'),
		$section = $('.section'),
		htmlbody = $('html,body');

	$section.waypoint(function(){
		var datasection = $(this).attr('data-section'),
			$topLinksDatasection = $('.navigation-top li[data-section="' + datasection + '"]'),
			$rightLinksDatasection = $('.navigation-right li[data-section="' + datasection + '"]'),
			$sideLinksDatasection = $('.navigation-side li[data-section="' + datasection + '"]'),
			$sectionDatasection = $('.section[data-section="' + datasection + '"]');

		// Scrolling - Toggle_style
		$Links.removeClass('active');
		$section.removeClass('current');
		$topLinksDatasection.addClass('active');
		$rightLinksDatasection.addClass('active');
		$sectionDatasection.addClass('current');
		// console.log('datasection'+':'+datasection);
	}, { offset: 104 });
	$win.scroll(function(){
		if ($win.scrollTop() == 0){
			$Links.removeClass('active');
			$('.navigation-top li[data-section="0"]').addClass('active');
		}
	}).scroll();



	$(function() {
		var $content = $('.content-marsk'),
			$toggleMenu = $('#open-button,#close-button');

		$toggleMenu.click(function() {
			$body.toggleClass("show-menu");
		});

		$content.click(function() {
			if ($body.hasClass('show-menu')) {
				$body.toggleClass("show-menu");
			}
		});
	});

	// GoToByScroll
	function goToByScroll(datasection){
		var goal = $('.section[data-section="' + datasection + '"]').offset().top;
		var goalPx = goal - 50;
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
	$sideLinks.click(function (e){
		e.preventDefault(e);
		datasection = $(this).attr('data-section');
		goToByScroll(datasection);
		$body.removeClass('show-menu')
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

	// 行動裝置時
	if(is_mobile() == true){

		// banner 等於裝置高
		// $(function(){
		// 	var menuHeight = $menu.height();
		// 	$('#section-0,.banner--tablet').css({'height': winHeight-menuHeight +'px'});
		// }).resize();

		// 手機 Banner Carousel
		$(function(){
			$(".banner--isphone").owlCarousel({
				navigation : true, // Show next and prev buttons
				slideSpeed : 1200,
				paginationSpeed : 10,
				singleItem:true,
				items: 1,
				loop:true,
				animateOut: 'fadeOut',
				autoplay:true,
				autoplayTimeout: 3000,
				autoHeight: false,
				autoHeightClass: 'owl-height'
			});
		});

		// 手機 Banner fix
		$(function(){
			$('.slide-1__bg, .slide-2__bg, .slide-3__bg, .slide-4__bg').fullsize($('#menu_top'));
			$('.slide-item').fullsize($('#menu_top'));
		});

	}

	if (is_mobile = false) {

		$(function(){
			// 右選單垂直置中
			$menuRight.verticalaligncenter();
			$('.container').css({'min-width':980});
		});
	}
});

$('.slide-item').fullsize();

//dom bug
// $('.icon-move').css(zindex,999);
// $('.icon-move').waypoint(function() {
//   notify('25% from the top');
// }, { offset: '25%' });
/*	----------------------------------------
*	Console
*	----------------------------------------
*/
	//	Get Section Offset
	//	$section.each(function(){
	//	console.log($section.eq(_a).offset());
	//	_a++;
	//	});

