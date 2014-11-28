# ----------------------------------------
#*  Global
#*  ----------------------------------------
#
$win          = $(window)
$body         = $("body")
$section      = $(".section")
$menu         = $("#menu_top")
$menuTop      = $menu.offset().top
$hpGroup      = $(".hp-group")
$pad          = $(".pad")
$previewBlock = $(".preview-block")
$banner       = $(".banner--tablet")
$mianSlider   = $("#mian-slider")
$menuRight    = $("#menu_right")
winWidth      = $win.width()
winHeight     = $win.height()
winScrollTop  = $win.scrollTop()
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

#
is_mobile = ->
  /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test navigator.userAgent

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

$ ->
  
  # BxSlider API Setting
  slider = $(".bxslider").bxSlider(
    mode: "fade"
    captions: true
  )
  
  # Window Scroll
  $win.scroll(->
    winScrollTop = $win.scrollTop()
    margin = 0
    $s2Top = $(".section").eq(1).offset().top
    topOfWindow = winScrollTop + margin
    $hpGroup.removeClass().addClass "hp-group"  if $s2Top > topOfWindow
    # senction = 0
    $(".hand--l, .hand--r").removeClass "hide"  if winScrollTop <= 206 - 65
    # senction 0 to section 1
    $(".hand--l, .hand--r").addClass "hide"  if winScrollTop > 207 - 65
    if winScrollTop < 508
      $hpGroup.removeClass "transform"
      $hpGroup.removeClass "gogo"
      $(".advantages").removeClass "current"
    if winScrollTop > 508
      $hpGroup.addClass "transform"
      $hpGroup.addClass "gogo"
      $(".advantages").addClass "current"
    $previewBlock.delay(100).removeClass "show"  if $s2Top > topOfWindow
    $previewBlock.delay(500).addClass "show"  if $s2Top - 200 < topOfWindow
    if winScrollTop < 500
      $(".slide__content,.slide__content,.slide__content,.text-d").fadeIn 0
      $menu.css "background-color", "rgba(255,255,255," + .25 + ")"  if winWidth > 768
    if winScrollTop > 500
      $(".slide__content,.slide__content,.slide__content,.text-d").fadeOut 0
      $menu.css "background-color", "rgba(255,255,255," + 1 + ")"
    return
  ).scroll()
  
  # Menu-Area
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
    
    # service - pages_btn 
    $(".bx-pager-item").eq(_this.index()).children().click()
    return

    # Service-Pages
  $("body").on "click", ".bx-pager-item a", ->
    _idx = $(this).parent().index()
    banner1_area _idx
    $("#slide-btn li").removeClass("active").eq(_idx).addClass "active"
    setTimeout (->
      $("#mian-slider > li").eq(_idx).show().siblings().hide()
      return
    ), 400
    return

  # Prev & Next
  $("body").on "click", ".bx-controls-direction a", ->
    _idx = $(".bx-pager-item .active").parent().index()
    $(".bx-pager-item a").eq(_idx).click()
    setTimeout (->
      $("#mian-slider > li").eq(_idx).show().siblings().hide()
      return
    ), 400
    return

  #.scene-tab-nav__lists
  $(".scene-tab-nav__list li").mouseenter ->
    tag_tab $(this)
    return

  $(".scene-cont").children().not(":eq(0)").hide()

  # Situation_svg
  situation_svg()

  # Scroll up bar
  # $menu.scrollupbar();

  # Parallax Scrolling
  $.stellar
    horizontalScrolling: false
    verticalOffset: 0

  # WOW Scrolling - effect
  if winWidth > 480
    wow = new WOW(
      boxClass: "wow"
      animateClass: "animated"
      offset: 0
      mobile: true
      live: true
    )
    wow.init()

  # Menu-top
  $topLinks = $(".navigation-top").find("li")
  $sideLinks = $(".menu-side").find("li")
  $rightLinks = $(".navigation-right").find("li")
  $Links = $(".navigation-top,.navigation-right").find("li")
  $section = $(".section")
  htmlbody = $("html,body")
  $section.waypoint ->
    datasection = $(this).attr("data-section")
    $topLinksDatasection = $(".navigation-top li[data-section=\"" + datasection + "\"]")
    $rightLinksDatasection = $(".navigation-right li[data-section=\"" + datasection + "\"]")
    $sideLinksDatasection = $(".menu-side li[data-section=\"" + datasection + "\"]")
    $sectionDatasection = $(".section[data-section=\"" + datasection + "\"]")
    
    # Scrolling - Toggle_style
    $Links.removeClass "active"
    $section.removeClass "current"
    $topLinksDatasection.addClass "active"
    $rightLinksDatasection.addClass "active"
    $sectionDatasection.addClass "current"
    return


  # console.log('datasection'+':'+datasection);
  $win.scroll(->
    if $win.scrollTop() is 0
      $Links.removeClass "active"
      $(".navigation-top li[data-section=\"0\"]").addClass "active"
    return
  ).scroll()


  # GoToByScroll
  goToByScroll = (datasection) ->
    goal = $(".section[data-section=\"" + datasection + "\"]").offset().top
    goalPx = goal - 50
    htmlbody.stop().animate
      scrollTop: goalPx
    , 1500, "easeInOutQuint"
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

$ ->
  
  # ==========================================
  # 不分裝置一律做
  # ==========================================
  
  # Close loading / Open Translation-effect
  $win.load ->
    clearInterval loading_timer
    if loading_count < 100
      i = loading_count

      while i <= 100
        $("#loading_progress").html "Please wait..  " + i + "%"
        i++
    $("#loading_box").fadeOut 1000
    return

  
  # Loading 
  loading_timer = setInterval(loading_progress, 5)
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

  
  # 行動裝置時
  if is_mobile() is true
    alert "is_mobile"
    
    # banner 等於裝置高
    $(->
      menuHeight = $menu.height()
      $("#section-0,.banner--tablet").css height: winHeight - menuHeight + "px"
      return
    ).resize()
    
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

  if is_mobile = false
    $ ->
      
      # 右選單垂直置中
      $menuRight.verticalaligncenter()
      return

  return
