var $banner, $body, $hpGroup, $menu, $menuRight, $menuTop, $mianSlider, $pad, $previewBlock, $section, $win, banner1_area, is_mobile, loading_count, loading_progress, loading_timer, situation_svg, slide_mask, tag_tab, winHeight, winScrollTop, winWidth, _a;

is_mobile = function() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
};

loading_progress = function() {
  var loading_count;

  loading_count++;
  if (loading_count > 100) {
    clearInterval(loading_timer);
    loading_count = 100;
  }
  $("#loading_progress").html("Please wait..  " + loading_count + "%");
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
  _mask.hide().eq(_idx).show();
};

situation_svg = function() {
  var _atv, _link, _mask, _tabs, _tips, _wrap;

  _wrap = $("#situation_svg");
  _mask = _wrap.find(".mask");
  _link = _wrap.find(".link");
  _tips = $(".scene-cont").children("li");
  _tabs = $(".scene-tab-nav__list").find("li");
  _atv = "active";
  _link.mouseenter(function() {
    var _idx, _this;

    _this = $(this);
    _idx = _this.index();
    _mask.hide().eq(_idx).show();
    _tips.hide().eq(_idx).show();
    _tabs.removeClass(_atv).eq(_idx).addClass(_atv);
  });
};

$win = $(window);

$body = $("body");

$section = $(".section");

$menu = $("#menu_top");

$menuTop = $menu.offset().top;

$hpGroup = $(".hp-group");

$pad = $(".pad");

$previewBlock = $(".preview-block");

$banner = $(".banner--tablet");

$mianSlider = $("#mian-slider");

$menuRight = $("#menu_right");

winWidth = $win.width();

winHeight = $win.height();

winScrollTop = $win.scrollTop();

loading_timer = 0;

loading_count = 0;

_a = 0;

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

(function($) {
  $.fn.fullsize = function(options) {
    var defaults, opts;

    defaults = {};
    opts = $.extend({}, defaults, options);
    return this.each(function() {
      var $selectHeight, _Height, _this;

      _this = $(this);
      $selectHeight = $win.find(options).height();
      _Height = winHeight;
      _this.css({
        width: "100%",
        height: _Height
      });
      _this.css({
        width: "100%",
        height: _Height - $selectHeight
      });
    });
  };
})(jQuery);

$(function() {
  var $Links, $icnTag, $rightLinks, $sideLinks, $topLinks, goToByScroll, htmlbody, reloadslider, slider, wow;

  reloadslider = function() {
    slider.reloadSlider({
      captions: true,
      adaptiveHeight: true,
      mode: "fade"
    });
  };
  goToByScroll = function(datasection) {
    var goal, goalPx;

    goal = $(".section[data-section=\"" + datasection + "\"]").offset().top;
    goalPx = goal - 50;
    htmlbody.stop().animate({
      scrollTop: goalPx
    }, 1500, "easeInOutQuint");
  };
  slider = $(".bxslider").bxSlider({
    captions: true,
    adaptiveHeight: true,
    mode: "fade"
  });
  $win.scroll(function() {
    var $s2Top, margin, topOfWindow;

    winScrollTop = $win.scrollTop();
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
      reloadslider();
    }
    if (winScrollTop > 508) {
      $hpGroup.addClass("transform");
      $hpGroup.addClass("gogo");
      $(".advantages").addClass("current");
      reloadslider();
    }
    if ($s2Top > topOfWindow) {
      $previewBlock.delay(100).removeClass("show");
    }
    if ($s2Top - 200 < topOfWindow) {
      $previewBlock.delay(500).addClass("show");
    }
    if (winScrollTop < 500) {
      $(".slide__content").fadeIn(0);
      if (winWidth > 768) {
        $menu.css("background-color", "rgba(255,255,255," + .25 + ")");
      }
    }
    if (winScrollTop > 500) {
      $(".slide__content").fadeOut(0);
      $menu.css("background-color", "rgba(255,255,255," + 1 + ")");
    }
  }).scroll();
  $(".screen-bg > div:eq(0)").css("z-index", 4);
  $("#slide-btn li").click(function() {
    var _active, _old, _this;

    _this = $(this);
    _active = "active";
    _old = $(".screen-bg").attr("data-pic");
    $(".screen-bg").attr("data-pic", _this.index());
    if (!_this.hasClass(_active)) {
      slide_mask(_this.index(), Number(_old));
      _this.addClass(_active).siblings().removeClass(_active);
      setTimeout((function() {
        $("#mian-slider > li").eq(_this.index()).show().siblings().hide();
      }), 400);
    }
    $(".bx-pager-item").eq(_this.index()).children().click();
  });
  $("body").on("click", ".bx-pager-item a", function() {
    var _idx;

    _idx = $(this).parent().index();
    banner1_area(_idx);
    $("#slide-btn li").removeClass("active").eq(_idx).addClass("active");
    setTimeout((function() {
      $("#mian-slider > li").eq(_idx).show().siblings().hide();
    }), 400);
  });
  $("body").on("click", ".bx-controls-direction a", function() {
    var _idx;

    _idx = $(".bx-pager-item .active").parent().index();
    $(".bx-pager-item a").eq(_idx).click();
    setTimeout((function() {
      $("#mian-slider > li").eq(_idx).show().siblings().hide();
    }), 400);
  });
  $(".scene-tab-nav__list li").mouseenter(function() {
    tag_tab($(this));
  });
  $(".scene-cont").children().not(":eq(0)").hide();
  situation_svg();
  $.stellar({
    horizontalScrolling: false,
    verticalOffset: 0
  });
  $win.load(function() {
    var i;

    clearInterval(loading_timer);
    if (loading_count < 100) {
      i = loading_count;
      while (i <= 100) {
        $("#loading_progress").html("Please wait..  " + i + "%");
        i++;
      }
    }
    $("#loading_box").fadeOut(1000);
  });
  loading_timer = setInterval(loading_progress, 5);
  if (winWidth > 480) {
    wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true
    });
    wow.init();
  }
  $topLinks = $(".navigation-top").find("li");
  $sideLinks = $(".menu-side").find("li");
  $rightLinks = $(".navigation-right").find("li");
  $Links = $(".navigation-top,.navigation-right").find("li");
  $section = $(".section");
  htmlbody = $("html,body");
  $section.waypoint((function() {
    var $rightLinksDatasection, $sectionDatasection, $sideLinksDatasection, $topLinksDatasection, datasection;

    datasection = $(this).attr("data-section");
    $topLinksDatasection = $(".navigation-top li[data-section=\"" + datasection + "\"]");
    $rightLinksDatasection = $(".navigation-right li[data-section=\"" + datasection + "\"]");
    $sideLinksDatasection = $(".menu-side li[data-section=\"" + datasection + "\"]");
    $sectionDatasection = $(".section[data-section=\"" + datasection + "\"]");
    $Links.removeClass("active");
    $section.removeClass("current");
    $topLinksDatasection.addClass("active");
    $rightLinksDatasection.addClass("active");
    $sectionDatasection.addClass("current");
  }), {
    offset: 104
  });
  $(function() {
    var $content, $toggleMenu;

    $content = $(".content-marsk");
    $toggleMenu = $("#open-button,#close-button");
    $toggleMenu.click(function() {
      $body.toggleClass("show-menu");
    });
    $content.click(function() {
      if ($body.hasClass("show-menu")) {
        $body.toggleClass("show-menu");
      }
    });
  });
  $(".menu_tag,.gos2").click(function(e) {
    var datasection;

    e.preventDefault(e);
    datasection = $(this).attr("data-section");
    goToByScroll(datasection);
  });
  $Links.click(function(e) {
    var datasection;

    e.preventDefault(e);
    datasection = $(this).attr("data-section");
    goToByScroll(datasection);
  });
  $sideLinks.click(function(e) {
    var datasection;

    e.preventDefault(e);
    datasection = $(this).attr("data-section");
    goToByScroll(datasection);
    $body.removeClass("show-menu");
  });
  $(".player .video-wrapper").css("background", "#D8D8D8");
  $icnTag = $(".icn-tag");
  $icnTag.css({
    "z-index": 1
  });
  $icnTag.hover((function() {
    $(this).css({
      "z-index": 9999
    });
  }), function() {
    $(this).css({
      "z-index": 1
    });
  });
  if (is_mobile() === true) {
    $(function() {
      $(".banner--isphone").owlCarousel({
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
    });
    $(function() {
      $(".slide-1__bg, .slide-2__bg, .slide-3__bg, .slide-4__bg").fullsize($("#menu_top"));
      $(".slide-item").fullsize($("#menu_top"));
    });
  }
  if (is_mobile = false) {
    $(function() {
      $menuRight.verticalaligncenter();
      $(".container").css({
        "min-width": 980
      });
    });
  }
});

$(".slide-item").fullsize();
