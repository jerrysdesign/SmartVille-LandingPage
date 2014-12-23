# ----------------------------------------
#*  Global
#*  ----------------------------------------
#
$win = $(window)
$body = $("body")
$section = $(".section")
$menu = $("#menu_top")
$menuTop = $menu.offset().top
$hpGroup = $(".hp-group")
$pad = $(".pad")
$previewBlock = $(".preview-block")
$banner = $(".banner--tablet")
$mianSlider = $("#mian-slider")
$menuRight = $("#menu_right")
winWidth = $win.width()
winHeight = $win.height()
winScrollTop = $win.scrollTop()
loading_timer = 0
loading_count = 0
_a = 0

# ----------------------------------------
#*  Function
#*  ----------------------------------------
#*  00 - Loading
#*  01 - Slide_Mask
#*  02 - Banner1_Area
#*  03 - Tag_Tab
#*  04 - Situation_svg
#*  ----------------------------------------
#

# 判斷瀏覽裝置為行動裝置
is_mobile = ->
	/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test navigator.userAgent

((a) ->
	(jQuery.browser = jQuery.browser or {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) or /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
	return
) navigator.userAgent or navigator.vendor or window.opera

# 00
loading_progress = ->
	loading_count++
	if loading_count > 100
		clearInterval loading_timer
		loading_count = 100
	$("#loading_progress").html "Please wait..  " + loading_count + "%"
	return

# 01
slide_mask = (idx, old) ->
	_wrap = $(".slide-mask-wrapper")
	_scbg = $(".screen-bg")
	_mask = _wrap.children()
	_spd = 1500
	_dfh = 620
	
	# Mask
	_wrap.stop().animate(
		height: _dfh
	, 0).delay(_spd).animate
		height: 0
	, 0
	_mask.stop().animate(
		top: _dfh
	, _spd).animate
		top: -_dfh
	, 0
	
	# pad screenshot
	_scbg.children().css("z-index", 0).eq(old).css("z-index", 3).end().eq(idx).css(
		"z-index": 4
		opacity: "0"
	).stop().delay(_spd / 1.5).animate
		opacity: "1"
	, _spd / 2.5
	return

# 02
banner1_area = (obj) ->
	_old = $(".screen-bg").attr("data-pic")
	unless obj is _old
		switch obj
			when 0
				$(".screen-bg").children().css("z-index", 0).eq(_old).css("z-index", 3).end().eq(0).css(
					"z-index": 4
					opacity: "0"
				).stop().animate
					opacity: "1"
				, 500
				$(".screen-bg").attr "data-pic", 0
			when 1
				$(".screen-bg").children().css("z-index", 0).eq(_old).css("z-index", 3).end().eq(1).css(
					"z-index": 4
					opacity: "0"
				).stop().animate
					opacity: "1"
				, 500
				$(".screen-bg").attr "data-pic", 1
			when 2
				$(".screen-bg").children().css("z-index", 0).eq(_old).css("z-index", 3).end().eq(2).css(
					"z-index": 4
					opacity: "0"
				).stop().animate
					opacity: "1"
				, 500
				$(".screen-bg").attr "data-pic", 2
			when 3
				$(".screen-bg").children().css("z-index", 0).eq(_old).css("z-index", 3).end().eq(3).css(
					"z-index": 4
					opacity: "0"
				).stop().animate
					opacity: "1"
				, 500
				$(".screen-bg").attr "data-pic", 3

# 03
tag_tab = (obj) ->
	_this = obj
	_cont = $(".scene-cont").children()
	_wrap = $("#situation_svg")
	_mask = _wrap.find(".mask")
	_idx = obj.index()
	_this.addClass("active").siblings().removeClass()
	_cont.eq(_idx).show().siblings().hide()
	_mask.hide().eq(_idx).show()
	return

# 04
situation_svg = ->
	_wrap = $("#situation_svg")
	_mask = _wrap.find(".mask")
	_link = _wrap.find(".link")
	_tips = $(".scene-cont").children("li")
	_tabs = $(".scene-tab-nav__list").find("li")
	_atv = "active"
	_link.mouseenter ->
		_this = $(this)
		_idx = _this.index()
		_mask.hide().eq(_idx).show()
		_tips.hide().eq(_idx).show()
		_tabs.removeClass(_atv).eq(_idx).addClass _atv
		return

	return


# 05
# 垂直置中
(($) ->
	$.fn.verticalaligncenter = (options) ->
		defaults = {}
		opts = $.extend({}, defaults, options)
		@each ->
			_this = $(this)
			_Height = _this.outerHeight(true)
			_this.css
				top: "50%"
				"margin-top": (_Height / 2) * -1

			return


	return
) jQuery

# 06
# 全畫面

(($) ->
	$.fn.fullsize = ->
		resizeEl = ->
			thiswidth = bgEl.width()
			thisheight = bgEl.height()
			winwidth = $(window).width()
			winheight = $(window).height()
			widthratio = winwidth / thiswidth
			heightratio = winheight / thisheight
			widthdiff = heightratio * thiswidth
			heightdiff = widthratio * thisheight
			if heightdiff > winheight
				bgEl.css
					width: winwidth + "px"
					height: heightdiff + "px"

			else
				bgEl.css
					width: widthdiff + "px"
					height: winheight + "px"

			return
		bgEl = $(this)
		resizeEl()
		$(window).resize ->
			resizeEl()
			return

		return

	return
) jQuery

$ ->
	
	# ==========================================
	# 不分裝置一律做
	# ==========================================
	
	# BxSlider API Setting
	
	# 重整 BxSlider
	reloadslider = ->
		slider.reloadSlider
			captions: true
			adaptiveHeight: true
			mode: "fade"

		return
	
	# Window Scroll
	# senction = 0
	# senction 0 to section 1
	# #menu_top - background opacity
	# Menu-Area
	# service - pages_btn 
	# Service-Pages
	# Prev & Next
	#.scene-tab-nav__lists
	# Situation_svg
	# Scroll up bar
	# $menu.scrollupbar();
	# Parallax Scrolling
	# Close loading / Open Translation-effect
	# Loading 
	# WOW Scrolling - effect
	# Menu-top
	# Scrolling - Toggle_style
	# console.log('datasection'+':'+datasection);
	
	# GoToByScroll
	goToByScroll = (datasection) ->
		goal = $(".section[data-section=\"" + datasection + "\"]").offset().top
		goalPx = goal - 50
		htmlbody.stop().animate
			scrollTop: goalPx
		, 1500, "easeInOutQuint"
		return
	slider = $(".bxslider").bxSlider(
		captions: true
		adaptiveHeight: true
		mode: "fade"
	)
	$win.scroll(->
		winScrollTop = $win.scrollTop()
		margin = 0
		$s2Top = $(".section").eq(1).offset().top
		topOfWindow = winScrollTop + margin
		$hpGroup.removeClass().addClass "hp-group"  if $s2Top > topOfWindow
		$(".hand--l, .hand--r").removeClass "hide"  if winScrollTop <= 206 - 65
		$(".hand--l, .hand--r").addClass "hide"  if winScrollTop > 207 - 65
		if winScrollTop < 507
			$hpGroup.removeClass "transform"
			$hpGroup.removeClass "gogo"
			$(".advantages").removeClass "current"
			reloadslider()
		if winScrollTop > 508
			$hpGroup.addClass "transform"
			$hpGroup.addClass "gogo"
			$(".advantages").addClass "current"
			reloadslider()
		$previewBlock.delay(100).removeClass "show"  if $s2Top > topOfWindow
		$previewBlock.delay(500).addClass "show"  if $s2Top - 200 < topOfWindow
		return
	).scroll()
	$(".screen-bg > div:eq(0)").css "z-index", 4
	$("#slide-btn li").click ->
		_this = $(this)
		_active = "active"
		_old = $(".screen-bg").attr("data-pic")
		$(".screen-bg").attr "data-pic", _this.index()
		unless _this.hasClass(_active)
			slide_mask _this.index(), Number(_old)
			_this.addClass(_active).siblings().removeClass _active
			setTimeout (->
				$("#mian-slider > li").eq(_this.index()).show().siblings().hide()
				return
			), 400
		$(".bx-pager-item").eq(_this.index()).children().click()
		return

	$("body").on "click", ".bx-pager-item a", ->
		_idx = $(this).parent().index()
		banner1_area _idx
		$("#slide-btn li").removeClass("active").eq(_idx).addClass "active"
		setTimeout (->
			$("#mian-slider > li").eq(_idx).show().siblings().hide()
			return
		), 400
		return

	$("body").on "click", ".bx-controls-direction a", ->
		_idx = $(".bx-pager-item .active").parent().index()
		$(".bx-pager-item a").eq(_idx).click()
		setTimeout (->
			$("#mian-slider > li").eq(_idx).show().siblings().hide()
			return
		), 400
		return

	$(".scene-tab-nav__list li").mouseenter ->
		tag_tab $(this)
		return

	$(".scene-cont").children().not(":eq(0)").hide()
	situation_svg()
	$.stellar
		horizontalScrolling: false
		verticalOffset: 0

	$win.load ->
		clearInterval loading_timer
		if loading_count < 100
			i = loading_count

			while i <= 100
				$("#loading_progress").html "Please wait..  " + i + "%"
				i++
		$("#loading_box").fadeOut 1000
		return

	loading_timer = setInterval(loading_progress, 5)
	if winWidth > 480
		wow = new WOW(
			boxClass: "wow"
			animateClass: "animated"
			offset: 0
			mobile: true
			live: true
		)
		wow.init()
	$topLinks = $(".navigation-top").find("li")
	$sideLinks = $(".navigation-side").find("li")
	$rightLinks = $(".navigation-right").find("li")
	$Links = $(".navigation-top,.navigation-right").find("li")
	$section = $(".section")
	htmlbody = $("html,body")
	$section.waypoint (->
		datasection = $(this).attr("data-section")
		$topLinksDatasection = $(".navigation-top li[data-section=\"" + datasection + "\"]")
		$rightLinksDatasection = $(".navigation-right li[data-section=\"" + datasection + "\"]")
		$sideLinksDatasection = $(".navigation-side li[data-section=\"" + datasection + "\"]")
		$sectionDatasection = $(".section[data-section=\"" + datasection + "\"]")
		$Links.removeClass "active"
		$section.removeClass "current"
		$topLinksDatasection.addClass "active"
		$rightLinksDatasection.addClass "active"
		$sectionDatasection.addClass "current"
		return
	),
		offset: 104

	# $win.scroll(->
	#   if $win.scrollTop() is 0
	#     $Links.removeClass "active"
	#     # $(".navigation-top li[data-section=\"0\"]").addClass "active"
	#   return
	# ).scroll()
	$ ->
		$content = $(".content-marsk")
		$toggleMenu = $("#open-button,#close-button")
		$toggleMenu.click ->
			$body.toggleClass "show-menu"
			return

		$content.click ->
			$body.toggleClass "show-menu"  if $body.hasClass("show-menu")
			return

		return

	
	# Logo
	$(".menu_tag,.gos2").click (e) ->
		e.preventDefault e
		datasection = $(this).attr("data-section")
		goToByScroll datasection
		return

	
	# Menu & Nav
	$Links.click (e) ->
		e.preventDefault e
		datasection = $(this).attr("data-section")
		goToByScroll datasection
		return

	$sideLinks.click (e) ->
		e.preventDefault e
		datasection = $(this).attr("data-section")
		goToByScroll datasection
		$body.removeClass "show-menu"
		return

	
	# Video Background
	$(".player .video-wrapper").css "background", "#D8D8D8"
	
	# Situation_svg - Tips Z-index
	$icnTag = $(".icn-tag")
	$icnTag.css "z-index": 1
	$icnTag.hover (->
		$(this).css "z-index": 9999
		return
	), ->
		$(this).css "z-index": 1
		return

# 行動裝置時
if jQuery.browser.mobile
	
	# 行動裝置時
	if is_mobile() is true
		
		# banner 等於裝置高
		# $(function(){
		#   var menuHeight = $menu.height();
		#   $('#section-0,.banner--tablet').css({'height': winHeight-menuHeight +'px'});
		# }).resize();
		
		# 手機 Banner Carousel
		$ ->
			$(".banner--isphone").owlCarousel
				navigation: true # Show next and prev buttons
				slideSpeed: 1200
				paginationSpeed: 10
				singleItem: true
				items: 1
				loop: true
				animateOut: "fadeOut"
				autoplay: true
				autoplayTimeout: 3000
				autoHeight: false
				autoHeightClass: "owl-height"

			return

		
		# 手機 Banner fix
		$ ->
			$(".slide-1__bg, .slide-2__bg, .slide-3__bg, .slide-4__bg").fullsize $("#menu_top")
			$(".slide-item").fullsize $("#menu_top")
			return

	if is_mobile = false
		$ ->
			
			# 右選單垂直置中
			$menuRight.verticalaligncenter()
			$(".container").css "min-width": 980
			return

			$win.scroll(->
				winScrollTop = $win.scrollTop()
				margin = 0
				$s2Top = $(".section").eq(1).offset().top
				topOfWindow = winScrollTop + margin
				# $hpGroup.removeClass().addClass "hp-group"  if $s2Top > topOfWindow
				# $(".hand--l, .hand--r").removeClass "hide"  if winScrollTop <= 206 - 65
				# $(".hand--l, .hand--r").addClass "hide"  if winScrollTop > 207 - 65
				# if winScrollTop < 507
				# 	$hpGroup.removeClass "transform"
				# 	$hpGroup.removeClass "gogo"
				# 	$(".advantages").removeClass "current"
				# 	reloadslider()
				# if winScrollTop > 508
				# 	$hpGroup.addClass "transform"
				# 	$hpGroup.addClass "gogo"
				# 	$(".advantages").addClass "current"
				# 	reloadslider()
				# $previewBlock.delay(100).removeClass "show"  if $s2Top > topOfWindow
				# $previewBlock.delay(500).addClass "show"  if $s2Top - 200 < topOfWindow
				if winScrollTop < 500
					$(".slide__content").fadeIn 0
					$menu.css "background-color", "rgba(255,255,255," + .25 + ")"  if winWidth > 768
				if winScrollTop > 500
					$(".slide__content").fadeOut 0
					$menu.css "background-color", "rgba(255,255,255," + 1 + ")"
				return
			).scroll()

	return

$(".slide-item").fullsize()

#dom bug
# $('.icon-move').css(zindex,999);
# $('.icon-move').waypoint(function() {
#   notify('25% from the top');
# }, { offset: '25%' });
# ----------------------------------------
#*  Console
#*  ----------------------------------------
#

# Get Section Offset
# $section.each(function(){
# console.log($section.eq(_a).offset());
# _a++;
# });