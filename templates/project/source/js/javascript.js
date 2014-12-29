var $Links, $hpGroup, $menu, $rightLinks, $section, $sideLinks, $topLinks, banner1_area, callFullSize, initMobile, initVariables, initWoWmobile, is_mobile, loading, loading_count, loading_progress, loading_timer, menuScrollState, mobileSideBanner, reloadslider, rightMenuAlignCenter, rwdToggleMenu, sceneTabNavMouseIn, scrollTransform, situation_svg, slideBtnClick, slideDotControl, slidePrevNextControl, slide_mask, slider, svgTipsZindex, tag_tab, topMenuState, winHeight, winScrollTop;

initVariables = function() {
  var $banner, $body, $document, $menu, $menuTop, $mianSlider, $pad, $previewBlock, $section, $window, loading_count, loading_timer, winHeight, winScrollTop, winWidth, _a;

  $document = $(document);
  $window = $(window);
  $body = $("body");
  $section = $(".section");
  $menu = $("#menu_top");
  $pad = $(".pad");
  $previewBlock = $(".preview-block");
  $banner = $(".banner--tablet");
  $mianSlider = $("#mian-slider");
  winWidth = $(window).width();
  winHeight = $(window).height();
  winScrollTop = $(window).scrollTop();
  $menuTop = $menu.offset().top;
  loading_timer = 0;
  loading_count = 0;
  return _a = 0;
};

is_mobile = function() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
};

loading_timer = 0;

loading_count = 0;

loading_progress = function() {
  loading_count++;
  if (loading_count > 100) {
    clearInterval(loading_timer);
    loading_count = 100;
  }
  return $("#loading_progress").html("Please wait..  " + loading_count + "%");
};

loading = function() {
  var i;

  clearInterval(loading_timer);
  if (loading_count < 100) {
    i = loading_count;
    while (i <= 100) {
      $("#loading_progress").html("Please wait..  " + i + "%");
      i++;
    }
  }
  return $("#loading_box").fadeOut(1000);
};

slide_mask = function(idx, old) {
  var _dfh, _mask, _scbg, _spd, _wrap;

  _wrap = $(".slide-mask-wrapper");
  _scbg = $(".screen-bg");
  _mask = _wrap.children();
  _spd = 1500;
  _dfh = 620;
  _wrap.stop().animate({
    height: _dfh
  }, 0).delay(_spd).animate({
    height: 0
  }, 0);
  _mask.stop().animate({
    top: _dfh
  }, _spd).animate({
    top: -_dfh
  }, 0);
  _scbg.children().css("z-index", 0).eq(old).css("z-index", 3).end().eq(idx).css({
    "z-index": 4,
    opacity: "0"
  }).stop().delay(_spd / 1.5).animate({
    opacity: "1"
  }, _spd / 2.5);
};

banner1_area = function(obj) {
  var _old;

  _old = $(".screen-bg").attr("data-pic");
  if (obj !== _old) {
    switch (obj) {
      case 0:
        $(".screen-bg").children().css("z-index", 0).eq(_old).css("z-index", 3).end().eq(0).css({
          "z-index": 4,
          opacity: "0"
        }).stop().animate({
          opacity: "1"
        }, 500);
        return $(".screen-bg").attr("data-pic", 0);
      case 1:
        $(".screen-bg").children().css("z-index", 0).eq(_old).css("z-index", 3).end().eq(1).css({
          "z-index": 4,
          opacity: "0"
        }).stop().animate({
          opacity: "1"
        }, 500);
        return $(".screen-bg").attr("data-pic", 1);
      case 2:
        $(".screen-bg").children().css("z-index", 0).eq(_old).css("z-index", 3).end().eq(2).css({
          "z-index": 4,
          opacity: "0"
        }).stop().animate({
          opacity: "1"
        }, 500);
        return $(".screen-bg").attr("data-pic", 2);
      case 3:
        $(".screen-bg").children().css("z-index", 0).eq(_old).css("z-index", 3).end().eq(3).css({
          "z-index": 4,
          opacity: "0"
        }).stop().animate({
          opacity: "1"
        }, 500);
        return $(".screen-bg").attr("data-pic", 3);
    }
  }
};

tag_tab = function(obj) {
  var _cont, _idx, _mask, _this, _wrap;

  _this = obj;
  _cont = $(".scene-cont").children();
  _wrap = $("#situation_svg");
  _mask = _wrap.find(".mask");
  _idx = obj.index();
  _this.addClass("active").siblings().removeClass();
  _cont.eq(_idx).show().siblings().hide();
  return _mask.hide().eq(_idx).show();
};

situation_svg = function() {
  var _atv, _link, _mask, _tabs, _tips, _wrap;

  _wrap = $("#situation_svg");
  _mask = _wrap.find(".mask");
  _link = _wrap.find(".link");
  _tips = $(".scene-cont").children("li");
  _tabs = $(".scene-tab-nav__list").find("li");
  _atv = "active";
  return _link.mouseenter(function() {
    var _idx, _this;

    _this = $(this);
    _idx = _this.index();
    _mask.hide().eq(_idx).show();
    _tips.hide().eq(_idx).show();
    return _tabs.removeClass(_atv).eq(_idx).addClass(_atv);
  });
};

(function($) {
  $.fn.verticalaligncenter = function(options) {
    var defaults, opts;

    defaults = {};
    opts = $.extend({}, defaults, options);
    return this.each(function() {
      var _Height, _this;

      _this = $(this);
      _Height = _this.outerHeight(true);
      _this.css({
        top: "50%",
        "margin-top": (_Height / 2) * -1
      });
    });
  };
})(jQuery);

$menu = $("#menu_top");

winHeight = $(window).height();

(function($) {
  $.fn.fullsize = function(options) {
    var defaults, opts;

    defaults = {};
    opts = $.extend({}, defaults, options);
    return this.each(function() {
      var _Height, _menuHeight, _this;

      _this = $(this);
      _menuHeight = $menu.height();
      _Height = winHeight;
      _this.css({
        width: "100%",
        height: _Height - _menuHeight
      });
    });
  };
})(jQuery);

slider = $(".bxslider").bxSlider({
  captions: true,
  adaptiveHeight: true,
  mode: "fade"
});

reloadslider = function() {
  slider.reloadSlider();
};

$hpGroup = $(".hp-group");

winScrollTop = $(window).scrollTop();

scrollTransform = function() {
  var $s2Top, margin, topOfWindow;

  margin = 0;
  $s2Top = $(".section").eq(1).offset().top;
  topOfWindow = winScrollTop + margin;
  if ($s2Top > topOfWindow) {
    $hpGroup.removeClass().addClass("hp-group");
  }
  if (winScrollTop <= 206 - 65) {
    $(".hand--l, .hand--r").removeClass("hide");
  }
  if (winScrollTop > 207 - 65) {
    $(".hand--l, .hand--r").addClass("hide");
  }
  if (winScrollTop < 507) {
    $hpGroup.removeClass("transform");
    $hpGroup.removeClass("gogo");
    $(".advantages").removeClass("current");
  }
  if (winScrollTop > 508) {
    $hpGroup.addClass("transform");
    $hpGroup.addClass("gogo");
    $(".advantages").addClass("current");
  }
  if (winScrollTop > 0 && winScrollTop < 1300) {
    return reloadslider();
  }
};

$(".screen-bg > div:eq(0)").css("z-index", 4);

slideBtnClick = function() {
  return $("#slide-btn li").click(function() {
    var _active, _old, _this;

    _this = $(this);
    _active = "active";
    _old = $(".screen-bg").attr("data-pic");
    $(".screen-bg").attr("data-pic", _this.index());
    if (!_this.hasClass(_active)) {
      slide_mask(_this.index(), Number(_old));
      _this.addClass(_active).siblings().removeClass(_active);
      setTimeout((function() {
        return $("#mian-slider > li").eq(_this.index()).show().siblings().hide();
      }), 400);
    }
    return $(".bx-pager-item").eq(_this.index()).children().click();
  });
};

slideDotControl = function() {
  return $("body").on("click", ".bx-pager-item a", function() {
    var _idx;

    _idx = $(this).parent().index();
    banner1_area(_idx);
    $("#slide-btn li").removeClass("active").eq(_idx).addClass("active");
    return setTimeout((function() {
      return $("#mian-slider > li").eq(_idx).show().siblings().hide();
    }), 400);
  });
};

slidePrevNextControl = function() {
  return $("body").on("click", ".bx-controls-direction a", function() {
    var _idx;

    _idx = $(".bx-pager-item .active").parent().index();
    $(".bx-pager-item a").eq(_idx).click();
    return setTimeout((function() {
      return $("#mian-slider > li").eq(_idx).show().siblings().hide();
    }), 400);
  });
};

sceneTabNavMouseIn = function() {
  $(".scene-tab-nav__list li").mouseenter(function() {
    return tag_tab($(this));
  });
  return $(".scene-cont").children().not(":eq(0)").hide();
};

$.stellar({
  horizontalScrolling: false,
  verticalOffset: 0
});

initWoWmobile = function() {
  var wow;

  if (winWidth > 480) {
    wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true
    });
    return wow.init();
  }
};

$topLinks = $(".navigation-top").find("li");

$sideLinks = $(".navigation-side").find("li");

$rightLinks = $(".navigation-right").find("li");

$Links = $(".navigation-top,.navigation-right").find("li");

$section = $(".section");

menuScrollState = function() {
  return $section.waypoint(function(direction) {
    var $rightLinksDatasection, $sectionDatasection, $sideLinksDatasection, $topLinksDatasection, datasection;

    datasection = $(this).attr("data-section");
    $topLinksDatasection = $(".navigation-top li[data-section=\"" + datasection + "\"]");
    $rightLinksDatasection = $(".navigation-right li[data-section=\"" + datasection + "\"]");
    $sideLinksDatasection = $(".navigation-side li[data-section=\"" + datasection + "\"]");
    $sectionDatasection = $(".section[data-section=\"" + datasection + "\"]");
    if (direction === "down") {
      $Links.removeClass("active");
      $section.removeClass("current");
      $topLinksDatasection.addClass("active");
      $rightLinksDatasection.addClass("active");
      return $sectionDatasection.addClass("current");
    }
  }, {
    offset: 104
  }).waypoint((function(direction) {
    var $rightLinksDatasection, $sectionDatasection, $sideLinksDatasection, $topLinksDatasection, datasection;

    datasection = $(this).attr("data-section");
    $topLinksDatasection = $(".navigation-top li[data-section=\"" + datasection + "\"]");
    $rightLinksDatasection = $(".navigation-right li[data-section=\"" + datasection + "\"]");
    $sideLinksDatasection = $(".navigation-side li[data-section=\"" + datasection + "\"]");
    $sectionDatasection = $(".section[data-section=\"" + datasection + "\"]");
    if (direction === "up") {
      $Links.removeClass("active");
      $section.removeClass("current");
      $topLinksDatasection.addClass("active");
      $rightLinksDatasection.addClass("active");
      return $sectionDatasection.addClass("current");
    }
  }), {
    offset: function() {
      return -($(this).height() - 154);
    }
  });
};

rwdToggleMenu = function() {
  var $content, $toggleMenu;

  $content = $(".content-marsk");
  $toggleMenu = $("#open-button,#close-button");
  $toggleMenu.click(function() {
    return $body.toggleClass("show-menu");
  });
  return $content.click(function() {
    if ($body.hasClass("show-menu")) {
      return $body.toggleClass("show-menu");
    }
  });
};

callFullSize = function() {
  $(".slide-1__bg, .slide-2__bg, .slide-3__bg, .slide-4__bg").fullsize();
  return $(".slide-item").fullsize();
};

mobileSideBanner = function() {
  return $(".banner--isphone").owlCarousel({
    navigation: true,
    slideSpeed: 1200,
    paginationSpeed: 10,
    singleItem: true,
    items: 1,
    loop: true,
    animateOut: "fadeOut",
    autoplay: true,
    autoplayTimeout: 3000,
    autoHeight: false,
    autoHeightClass: "owl-height"
  });
};

svgTipsZindex = function() {
  var $icnTag;

  $icnTag = $(".icn-tag");
  $icnTag.css({
    "z-index": 1
  });
  return $icnTag.hover((function() {
    return $(this).css({
      "z-index": 9999
    });
  }), function() {
    return $(this).css({
      "z-index": 1
    });
  });
};

rightMenuAlignCenter = function() {
  var $menuRight;

  $menuRight = $("#menu_right");
  return $menuRight.verticalaligncenter();
};

topMenuState = function() {
  var winWidth;

  $menu = $("#menu_top");
  winScrollTop = $(window).scrollTop();
  winWidth = $(window).width();
  if (winScrollTop < 500 && winWidth > 768) {
    $(".slide__content").fadeIn(0);
    $menu.css("background-color", "rgba(255,255,255," + .25 + ")");
  }
  if (winScrollTop > 500) {
    $(".slide__content").fadeOut(0);
    return $menu.css("background-color", "rgba(255,255,255," + 1 + ")");
  }
};

initMobile = function() {
  if (is_mobile() === true) {
    callFullSize();
    mobileSideBanner;
    return initWoWmobile();
  } else {
    rightMenuAlignCenter();
    return $(window).scroll(function() {
      return topMenuState();
    });
  }
};

$(function() {
  var goToByScroll, htmlbody;

  htmlbody = $("html,body");
  goToByScroll = function(datasection) {
    var goal, goalPx;

    goal = $(".section[data-section=\"" + datasection + "\"]").offset().top;
    goalPx = goal - 50;
    return htmlbody.stop().animate({
      scrollTop: goalPx
    }, 1500, "easeInOutQuint");
  };
  $(".menu_tag,.gos2").click(function(e) {
    var datasection;

    e.preventDefault(e);
    datasection = $(this).attr("data-section");
    return goToByScroll(datasection);
  });
  $Links.click(function(e) {
    var datasection;

    e.preventDefault(e);
    datasection = $(this).attr("data-section");
    return goToByScroll(datasection);
  });
  return $sideLinks.click(function(e) {
    var datasection;

    e.preventDefault(e);
    datasection = $(this).attr("data-section");
    goToByScroll(datasection);
    return $body.removeClass("show-menu");
  });
});

$(function() {
  initVariables();
  initMobile();
  sceneTabNavMouseIn();
  svgTipsZindex();
  rwdToggleMenu();
  return situation_svg();
});

$(window).scroll(function() {
  initVariables();
  return scrollTransform();
}).scroll();

$(window).on("resize load", function() {
  initVariables();
  slideBtnClick();
  slideDotControl();
  slidePrevNextControl();
  menuScrollState();
  return reloadslider();
}).on("load", function() {
  loading();
  return loading_timer = setInterval(loading_progress, 5);
});
