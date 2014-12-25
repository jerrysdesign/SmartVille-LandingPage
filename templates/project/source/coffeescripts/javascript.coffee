# ----------------------------------------
#*  Global
#*  ----------------------------------------
#
initVariables = ->
	$document = $(document)
	$window = $(window)
	$body = $("body")

	$section = $(".section")
	$menu = $("#menu_top")
	$pad = $(".pad")
	$previewBlock = $(".preview-block")
	$banner = $(".banner--tablet")
	$mianSlider = $("#mian-slider")
	winWidth = $(window).width()
	winHeight = $(window).height()
	winScrollTop = $(window).scrollTop()
	$menuTop = $menu.offset().top
	loading_timer = 0
	loading_count = 0
	_a = 0
	# return
# initVariables()


# ----------------------------------------
#*  Function
#*  ----------------------------------------
#*  00 - Check_Mobile
#*  01 - Loading
#*  02 - Slide_Mask
#*  03 - Banner1_Area
#*  04 - Tag_Tab
#*  05 - Situation_svg
#*  ----------------------------------------
#


# 00 - Check_Mobile
is_mobile = ->
	/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test navigator.userAgent


loading_timer = 0
loading_count = 0

# 01 - Loading
loading_progress = ->
	loading_count++
	if loading_count > 100
		clearInterval loading_timer
		loading_count = 100
	$("#loading_progress").html "Please wait..  " + loading_count + "%"

# 01 - Loading
loading = ->
	clearInterval loading_timer
	if loading_count < 100
		i = loading_count
		while i <= 100
			$("#loading_progress").html "Please wait..  " + i + "%"
			i++
	$("#loading_box").fadeOut 1000


# 02 - Slide_Mask
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


# 04 - Tag_Tab
banner1_area = (obj) ->
	_old = $(".screen-bg").attr("data-pic")
	unless obj is _old
		i = 0
		while this < 3
			$(".screen-bg").children().css("z-index", 0).eq(_old).css("z-index", 3).end().eq(i).css(
				"z-index": 4
				opacity: "0"
			).stop().animate
				opacity: "1"
			, 500
			$(".screen-bg").attr "data-pic", i
			i++


# 05 - Situation_svg
tag_tab = (obj) ->
	_this = obj
	_cont = $(".scene-cont").children()
	_wrap = $("#situation_svg")
	_mask = _wrap.find(".mask")
	_idx = obj.index()
	_this.addClass("active").siblings().removeClass()
	_cont.eq(_idx).show().siblings().hide()
	_mask.hide().eq(_idx).show()


# 05 - Situation_svg
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
		_tabs.removeClass(_atv).eq(_idx).addClass(_atv)



# ----------------------------------------
#*  jQuery Puglin
#*  ----------------------------------------
#*  00 - Vertical_Align_Center
#*  01 - Full_Size
#*  ----------------------------------------
#


# 00
# Vertical_Align_Center
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


# 01
# Full_Size
$menu = $("#menu_top")
winHeight = $(window).height()
(($) ->
	$.fn.fullsize = (options) ->
		defaults = {}
		opts = $.extend({}, defaults, options)
		@each ->
			_this = $(this)
			_menuHeight = $menu.height()
			_Height = winHeight
			_this.css
				width: "100%"
				height: _Height - _menuHeight
			return
	return
) jQuery




# ==========================================
# 不分裝置一律做
# ==========================================


# Call BxSlider API Setting
slider = $(".bxslider").bxSlider(
	captions: true
	adaptiveHeight: true
	mode: "fade"
)

# Reload BxSlider
reloadslider = ->
	# Call BxSlider Reload API
	slider.reloadSlider()
	return


# GoToByScroll
$body = $('body')
goToByScroll = (datasection) ->
	goal = $(".section[data-section=\"" + datasection + "\"]").offset().top
	goalPx = goal - 50
	$body.stop().animate
		scrollTop: goalPx
	, 1500, "easeInOutQuint"
	return


# Section0 to Section2 Transform
$hpGroup = $(".hp-group")
winScrollTop = $(window).scrollTop()
scrollTransform = ->
	margin = 0
	$s2Top = $(".section").eq(1).offset().top
	topOfWindow = winScrollTop + margin
	$hpGroup.removeClass().addClass("hp-group") if $s2Top > topOfWindow
	$(".hand--l, .hand--r").removeClass("hide") if winScrollTop <= 206 - 65
	$(".hand--l, .hand--r").addClass("hide") if winScrollTop > 207 - 65
	if winScrollTop < 507
		$hpGroup.removeClass("transform")
		$hpGroup.removeClass("gogo")
		$(".advantages").removeClass("current")
	if winScrollTop > 508
		$hpGroup.addClass("transform")
		$hpGroup.addClass("gogo")
		$(".advantages").addClass("current")
	if winScrollTop > 0 && winScrollTop < 1300
		reloadslider()


slideBtnClick = ->
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
			), 400
		$(".bx-pager-item").eq(_this.index()).children().click()


slideDotControl = ->
	$(".bx-pager-item a").click ->
		_idx = $(this).parent().index()
		banner1_area _idx
		$("#slide-btn li").removeClass("active").eq(_idx).addClass "active"
		setTimeout (->
			$("#mian-slider > li").eq(_idx).show().siblings().hide()
		), 400


slidePrevNextControl = ->
	$(".bx-controls-direction a").click ->
		_idx = $(".bx-pager-item .active").parent().index()
		$(".bx-pager-item a").eq(_idx).click()
		setTimeout (->
			$("#mian-slider > li").eq(_idx).show().siblings().hide()
		), 400

sceneTabNavMouseIn = ->
	$(".scene-tab-nav__list li").mouseenter ->
		tag_tab $(this)


$(".scene-cont").children().not(":eq(0)").hide()

$.stellar
	horizontalScrolling: false
	verticalOffset: 0

initWoWmobile = ->
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

# Menu Scroll State
menuScrollState = ->
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
	),
		offset: 104


rwdToggleMenu = ->
	$content = $(".content-marsk")
	$toggleMenu = $("#open-button,#close-button")
	$toggleMenu.click ->
		$body.toggleClass "show-menu"
	$content.click ->
		$body.toggleClass "show-menu"  if $body.hasClass("show-menu")


# Logo
$(".menu_tag,.gos2").click ->
	datasection = $(this).attr("data-section")
	goToByScroll(datasection)


# Menu & Nav
$Links.click ->
	datasection = $(this).attr("data-section")
	goToByScroll(datasection)


$sideLinks.click ->
	datasection = $(this).attr("data-section")
	goToByScroll(datasection)
	$body.removeClass("show-menu")


# Video Background
# $(".player .video-wrapper").css "background", "#D8D8D8"


# 手機 Banner fix
callFullSize = ->
	# banner 等於裝置高
	$(".slide-1__bg, .slide-2__bg, .slide-3__bg, .slide-4__bg").fullsize()
	$(".slide-item").fullsize()


# 手機 Banner Carousel
mobileSideBanner = ->
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


# Situation_svg - Tips Z-index
svgTipsZindex = ->
	$icnTag = $(".icn-tag")
	$icnTag.css "z-index": 1
	$icnTag.hover (->
		$(this).css "z-index": 9999
	), ->
		$(this).css "z-index": 1


rightMenuAlignCenter = ->
	# 右選單垂直置中 
	$menuRight = $("#menu_right")
	$menuRight.verticalaligncenter()
	

topMenuState = ->
	$menu = $("#menu_top")
	winScrollTop = $(window).scrollTop()
	winWidth = $(window).width()
	if winScrollTop < 500 && winWidth > 768
		$(".slide__content").fadeIn 0
		$menu.css "background-color", "rgba(255,255,255," + .25 + ")"
	if winScrollTop > 500
		$(".slide__content").fadeOut 0
		$menu.css "background-color", "rgba(255,255,255," + 1 + ")"


initMobile = ->
	# 行動裝置時
	if is_mobile() is true
		callFullSize()
		mobileSideBanner
		initWoWmobile()
	# 非行動裝置
	else
		rightMenuAlignCenter()
		$(window).scroll ->
			topMenuState()


$ ->
	initVariables()
	initMobile()
	sceneTabNavMouseIn()
	svgTipsZindex()
	rwdToggleMenu()
	situation_svg()

$(window).scroll( ->
	initVariables()
	scrollTransform()
).scroll()

$(window).on("resize load", ->
	initVariables()
	slideBtnClick()
	slideDotControl()
	slidePrevNextControl()
	menuScrollState()
	reloadslider()

	).on("load", ->
		# initVariables()
		loading()
		loading_timer = setInterval(loading_progress, 5)
	)

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