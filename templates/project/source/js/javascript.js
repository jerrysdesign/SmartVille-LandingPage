var $banner, $body, $hpGroup, $menu, $menuRight, $menuTop, $mianSlider, $pad, $previewBlock, $section, $win, banner1_area, is_mobile, loading_count, loading_progress, loading_timer, situation_svg, slide_mask, tag_tab, winHeight, winScrollTop, winWidth, _a;

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

is_mobile = function() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
};

(function(a) {
  (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
})(navigator.userAgent || navigator.vendor || window.opera);

loading_progress = function() {
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

$(function() {
  var $Links, $icnTag, $rightLinks, $sideLinks, $topLinks, goToByScroll, htmlbody, reloadslider, slider, wow;

  slider = $(".bxslider").bxSlider({
    captions: true,
    adaptiveHeight: true,
    mode: "fade"
  });
  reloadslider = function() {
    slider.reloadSlider();
  };
  goToByScroll = function(datasection) {
    var goal, goalPx;

    goal = $(".section[data-section=\"" + datasection + "\"]").offset().top;
    goalPx = goal - 50;
    htmlbody.stop().animate({
      scrollTop: goalPx
    }, 1500, "easeInOutQuint");
  };
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
    }
    if (winScrollTop > 508) {
      $hpGroup.addClass("transform");
      $hpGroup.addClass("gogo");
      $(".advantages").addClass("current");
    }
    if (winScrollTop > 0 && winScrollTop < 1300) {
      reloadslider();
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
  $sideLinks = $(".navigation-side").find("li");
  $rightLinks = $(".navigation-right").find("li");
  $Links = $(".navigation-top,.navigation-right").find("li");
  $section = $(".section");
  htmlbody = $("html,body");
  $section.waypoint((function() {
    var $rightLinksDatasection, $sectionDatasection, $sideLinksDatasection, $topLinksDatasection, datasection;

    datasection = $(this).attr("data-section");
    $topLinksDatasection = $(".navigation-top li[data-section=\"" + datasection + "\"]");
    $rightLinksDatasection = $(".navigation-right li[data-section=\"" + datasection + "\"]");
    $sideLinksDatasection = $(".navigation-side li[data-section=\"" + datasection + "\"]");
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
  return $icnTag.hover((function() {
    $(this).css({
      "z-index": 9999
    });
  }), function() {
    $(this).css({
      "z-index": 1
    });
  });
});

if (is_mobile() === true) {
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
  $(".slide-1__bg, .slide-2__bg, .slide-3__bg, .slide-4__bg").fullsize();
  $(".slide-item").fullsize();
} else {
  $menuRight.verticalaligncenter();
  $(".container").css({
    "min-width": 980
  });
  $win.scroll(function() {
    if (winScrollTop < 500 && winWidth > 768) {
      $(".slide__content").fadeIn(0);
      $menu.css("background-color", "rgba(255,255,255," + .25 + ")");
    }
    if (winScrollTop > 500) {
      $(".slide__content").fadeOut(0);
      return $menu.css("background-color", "rgba(255,255,255," + 1 + ")");
    }
  });
}
