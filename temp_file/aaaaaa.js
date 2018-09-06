define("wiki-lemma:widget/lemma_content/mainContent/sideCatalog/sideCatalog", function(o, t, s) {
    var i = o("wiki-common:widget/lib/jquery/jquery")
      , l = o("wiki-common:widget/component/nslog/nslog")
      , n = function(o) {
        var t = i(".side-catalog")
          , s = (i(".side-catalog .toggle-button"),
        i(".side-catalog .go-up"))
          , n = i(".side-catalog .go-down")
          , a = i(".side-catalog .arrow")
          , e = i(".side-catalog .catalog-scroller")
          , c = e.find(".catalog-list")
          , r = i(".content-wrapper")
          , d = i(".right-wrap")
          , f = this
          , p = !0
          , u = !1
          , h = function() {
            var o = e.scrollTop()
              , t = e.find(".catalog-list").height()
              , i = e.height();
            0 >= o ? s.addClass("disable") : s.removeClass("disable"),
            o >= t - i ? n.addClass("disable") : n.removeClass("disable")
        };
        this.scrollUp = function(o) {
            var t = 19 * o
              , s = e.scrollTop();
            e.stop().animate({
                scrollTop: s - t
            }, 200, function() {
                h(),
                n.removeClass("disable")
            })
        }
        ,
        this.scrollDown = function(o) {
            var t = 19 * o
              , i = e.scrollTop();
            e.stop().animate({
                scrollTop: i + t
            }, 200, function() {
                s.removeClass("disable"),
                h()
            })
        }
        ,
        this.toDisplay = function() {
            var o = i(".side-content")
              , s = 1200
              , n = o.offset().top + o.height()
              , a = Math.max(n, s)
              , e = i(window).scrollTop();
            e >= a ? (t.css("visibility", "visible"),
            p && (p = !1,
            l(10002801))) : (t.css("visibility", "hidden"),
            p = !0);
            var c = r.offset().top + r.height()
              , d = i(window).height() + e;
            if (d > c) {
                var f = d - c + 10;
                t.css("bottom", f + "px")
            } else
                t.css("bottom", "10px")
        }
        ,
        this.scrollTo = function(o) {
            var s = t.find('[href="#' + o + '"]');
            if (!(s.length <= 0)) {
                s = s.parents(".catalog-title");
                var i = 0 === s.index()
                  , l = s.offset().top - c.offset().top + 5;
                (s.offset().top !== c.offset().top || i) && (e.stop().animate({
                    scrollTop: l - 176
                }, 300, function() {
                    h()
                }),
                a.stop().animate({
                    top: l
                }, 300))
            }
        }
        ;
        var g = function() {
            for (var o = i(document.body).find(".lemma-anchor.para-title"), t = i(window).scrollTop(), s = 999999, l = o.eq(0), n = 0; n < o.length; n++) {
                var a = o.eq(n)
                  , e = Math.abs(a.offset().top - t)
                  , c = a.offset().top < t + i(window).height();
                s > e && c && (s = e,
                l = a)
            }
            return l.attr("name")
        }
          , m = null
          , w = function() {
            m && (clearTimeout(m),
            m = null),
            m = setTimeout(function() {
                var o = g();
                f.scrollTo(o)
            }, 50),
            f.toDisplay()
        }
          , v = function() {
            var o = e.find(".catalog-list").height()
              , s = e.height();
            0 >= o - s && (d.hide(),
            u = !0),
            t.on("click", ".toggle-button", function() {
                t.hasClass("collapse") ? (t.removeClass("collapse"),
                t.hasClass("side-catalog-smaller") && d.show()) : (t.addClass("collapse"),
                t.hasClass("side-catalog-smaller") && d.hide())
            }),
            !u && t.hover(function() {
                !t.hasClass("collapse") && d.show()
            }, function() {
                !t.hasClass("collapse") && d.hide()
            }),
            e.bind("mouseover", function() {
                e.bind("mousewheel", function(o, t) {
                    var s = -t;
                    return 0 > s ? f.scrollUp(7) : f.scrollDown(7),
                    o.stopPropagation(),
                    !1
                })
            }).bind("mouseout", function() {
                e.unbind("mousewheel")
            }),
            i(window).bind("scroll", w),
            i(document).bind("ready", function() {
                w(),
                f.toDisplay()
            }),
            t.on("click", ".go-up", function() {
                f.scrollUp(5)
            }),
            t.on("click", ".go-down", function() {
                f.scrollDown(5)
            }),
            t.on("click", ".gotop-button", function() {
                i(window).scrollTop(0)
            })
        };
        setTimeout(function() {
            v()
        }, 2500)
    };
    s.exports = n
});