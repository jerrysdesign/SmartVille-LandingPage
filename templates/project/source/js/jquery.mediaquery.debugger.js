(function($){
    $.fn.mqDebug = function(options) {
        var windowWidth = $(window).width();

        var pMobileMin = 0;
        var pMobileMax = 480;
        var lMobileMin = pMobileMax + 1;
        var lMobileMax = 767;
        var pTabletMin = lMobileMax + 1;
        var pTabletMax = 979;
        var lTabletMin = pTabletMax + 1;
        var lTabletMax = 1199;
        var ws = lTabletMax + 1;
        var ws02 = 1366;
        var ws03 = 1440;
        var designation = "";

        this.each(function() {
            if ((windowWidth >= pMobileMin) && (windowWidth <= pMobileMax)) { designation = "Mobile Portrait"; }
            if ((windowWidth >= lMobileMin) && (windowWidth <= lMobileMax)) { designation = "Mobile Landscape"; }
            if ((windowWidth >= pTabletMin) && (windowWidth <= pTabletMax)) { designation = "Tablet Portrait"; }
            if ((windowWidth >= lTabletMin) && (windowWidth <= lTabletMax)) { designation = "Tablet Landscape"; }
            if (windowWidth >= ws) { designation = "1200px"; }
            if (windowWidth >= ws02) { designation = "1366px"; }
            if (windowWidth >= ws03) { designation = "1440px"; }

            $(this).addClass('mq-debug');
            $(this).text(designation);

            function debug(e){
                var $body     = $('body'),
                    $layoutDebugger    = 'layout-debugger',
                    $toggle   = $body.toggleClass($layoutDebugger),
                    $hasclass = $body.hasClass($layoutDebugger);
                    $hasclass ? outline('*') : location.reload();
            }
            function outline(a){
                [].forEach.call(
                    document.querySelectorAll(a),
                    function(b){
                        b.style.outline = "1px solid #" + (~~(Math.random()*(1<<24))).toString(16)
                    }
                )
            }
            $(this).click(debug);

        });

        return false;
    }
})(jQuery);